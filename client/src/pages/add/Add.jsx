import React, { useReducer, useState } from "react";
import "./Add.scss";
import { projectReducer, INITIAL_STATE } from "../../reducers/projectReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(projectReducer, INITIAL_STATE);

  const handleChange = (e) => {    
    e.preventDefault();
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleRequirement = (e) => {
    e.preventDefault();    
    dispatch({
      type: "ADD_FEATURE", // still using reducer key
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (project) => {      
      return newRequest.post("/projects", project); // changed endpoint
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myProjects"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();      
      mutation.mutate(state);
      // navigate("/myprojects");
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Research Project</h1>
        <div className="sections">
          {/* LEFT SIDE */}
          <div className="info">
            <label htmlFor="">Project Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Deep Learning for Medical Imaging"
              onChange={handleChange}
            />

            <label htmlFor="">Research Domain</label>
            <select name="domain" id="domain" onChange={handleChange}>
              <option value="ai">Artificial Intelligence</option>
              <option value="ml">Machine Learning</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="biology">Biology</option>
              <option value="other">Other</option>
            </select>

            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>

            <label htmlFor="">Project Description</label>
            <textarea
              name="desc"
              placeholder="Detailed description of the research project"
              cols="0"
              rows="16"
              onChange={handleChange}
            ></textarea>

            <button onClick={handleSubmit}>Create Project</button>
          </div>

          {/* RIGHT SIDE */}
          <div className="details">
            <label htmlFor="">Research Focus / Sub-Title</label>
            <input
              type="text"
              name="shortTitle"
              placeholder="e.g. Image Classification using CNNs"
              onChange={handleChange}
            />

            <label htmlFor="">Expected Student Contribution</label>
            <textarea
              name="shortDesc"
              onChange={handleChange}
              placeholder="e.g. Literature review, dataset preparation, model training"
              cols="30"
              rows="10"
            ></textarea>

            <label htmlFor="">Expected Duration (weeks)</label>
            <input type="number" name="durationWeeks" onChange={handleChange} />

            <label htmlFor="">Number of Positions Available</label>
            <input
              type="number"
              name="positionsAvailable"
              onChange={handleChange}
            />

            <label htmlFor="">Add Requirements</label>
            <form className="add" onSubmit={handleRequirement}>
              <input type="text" placeholder="e.g. Knowledge of Python" />
              <button type="submit">add</button>
            </form>

            <div className="addedFeatures">
              {state?.requirements?.map((req) => (
                <div className="item" key={req}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: req })
                    }
                  >
                    {req}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>

            <label htmlFor="">Stipend (if any)</label>
            <input type="number" onChange={handleChange} name="stipend" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
