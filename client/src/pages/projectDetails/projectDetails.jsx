import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import getCurrentUser from "../../utils/getCurrentUser";
import "./ProjectDetails.scss";

function ProjectDetails() {
  const { id } = useParams();
  const currentUser = getCurrentUser();

  const { isLoading, error, data } = useQuery({
    queryKey: ["project", id],
    queryFn: () =>
      newRequest.get(`/projects/single/${id}`).then((res) => res.data),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;
  console.log(data);
  
  return (
    <div className="projectDetails">
      {/* Cover Image */}
      <div className="cover">
        <img src={data.cover} alt={data.title} />
      </div>

      {/* Info Section */}
      <div className="info">
        <h1>{data.title}</h1>
        <p><b>Research Focus:</b> {data.shortTitle}</p>
        <p><b>Domain:</b> {data.domain}</p>
        <p><b>Expected Student Contribution:</b> {data.shortDesc}</p>
        <p><b>Duration:</b> {data.durationWeeks} weeks</p>
        <p><b>Positions Available:</b> {data.positionsAvailable}</p>
        <p><b>Requirements:</b> {data.requirements?.join(", ") || "None"}</p>
        <p><b>Stipend:</b> ₹{data.stipend || "N/A"}</p>
        <p><b>Description:</b> {data.desc}</p>
        <p><b>Professor:</b> {data.professorId.username}</p>

        {/* Additional Images */}
        {data.images?.length > 0 && (
          <div className="images">
            <h3>Project Images</h3>
            <div className="imageGrid">
              {data.images.map((img, index) => (
                <img key={index} src={img} alt={`Project image ${index + 1}`} />
              ))}
            </div>
          </div>
        )}

        {/* Requests visible to professors */}
        {currentUser.role === "professor" && (
          <div className="requests">
            <h2>Student Requests</h2>
            {data.requests?.length > 0 ? (
              <ul>
                {data.requests.map((req) => (
                  <li key={req._id}>
                    <b>{req.studentName}</b> - {req.status}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No requests yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectDetails;
