import React from "react";
import { Link } from "react-router-dom";
import "./MyProjects.scss";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function MyProjects() {
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myProjects"],
    queryFn: () =>
      newRequest.get(`/projects/userId=${currentUser.id}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (id) => newRequest.delete(`/projects/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["myProjects"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="myProjects">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="title">
            <h1>My Projects</h1>
            {currentUser.role === "professor" && (
              <Link to="/addProject">
                <button className="addBtn">+ Add New Project</button>
              </Link>
            )}
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Stipend</th>
                <th>Domain</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((project) => (
                <tr key={project._id}>
                  <td>
                    <img className="image" src={project.cover} alt="" />
                  </td>
                  <td>{project.title}</td>
                  <td>{project.stipend}</td>
                  <td>{project.domain}</td>
                  <td className="actions">
                    <Link to={`/projects/${project._id}`} target="_blank">
                      <button className="detailsBtn">View Details</button>
                    </Link>
                    <button
                      className="deleteBtn"
                      onClick={() => handleDelete(project._id)}
                    >
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyProjects;
