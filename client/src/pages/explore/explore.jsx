import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import "./explore.scss";

function ExploreProjects() {
  const [page, setPage] = useState(1);

  const { isLoading, error, data } = useQuery({
    queryKey: ["projects", page],
    queryFn: () =>
      newRequest.get(`/projects?page=${page}`).then((res) => res.data),
  });

  return (
    <div className="exploreProjects">
      <div className="container">
        <div className="title">
          <h1>Explore Research Projects</h1>
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Something went wrong!</p>
        ) : (
          <>
            <div className="grid">
              {data.projects.map((project) => (
                <div className="card" key={project._id}>
                  <img
                    className="cover"
                    src={project.cover}
                    alt={project.title}
                  />
                  <div className="card-body">
                    <h3>{project.title}</h3>
                    <p className="domain">{project.domain}</p>
                    <p className="professor">
                      👨‍🏫 {project.professorId?.username || "Unknown Professor"}
                    </p>
                    <p className="stipend">
                      💰 Stipend: {project.stipend > 0 ? `₹${project.stipend}` : "Unpaid"}
                    </p>
                    <p className="duration">
                      ⏳ {project.durationWeeks} weeks • 👥 {project.positionsAvailable} positions
                    </p>
                    <p className="shortDesc">{project.shortDesc}</p>

                    <div className="requirements">
                      {project.requirements.slice(0, 3).map((req, idx) => (
                        <span key={idx} className="req-tag">
                          {req}
                        </span>
                      ))}
                      {project.requirements.length > 3 && (
                        <span className="req-tag more">+{project.requirements.length - 3} more</span>
                      )}
                    </div>

                    <Link to={`/projects/${project._id}`} target="_blank">
                      <button className="detailsBtn">View Details</button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="pagination">
              <button
                className="pageBtn"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              >
                ⬅ Prev
              </button>
              <span>Page {page}</span>
              <button
                className="pageBtn"
                onClick={() => setPage((prev) => prev + 1)}
                disabled={!data.hasMore}
              >
                Next ➡
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ExploreProjects;
