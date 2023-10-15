import { useState } from "react";
import { Video } from "../Video";
import { Result } from "../Result";
import "./VideoContents.module.css";
// import TwelveLabsApi from "../../lib/twelveLabsApi";

export function VideoContents({ video }) {
  const [loading, setLoading] = useState(false);
  const [field1, field2, field3] = ["summary", "chapter", "highlight"];
  const [field1Prompt, setField1Prompt] = useState({
    fieldName: field1,
    isChecked: true,
  });
  const [field2Prompt, setField2Prompt] = useState({
    fieldName: field2,
    isChecked: true,
  });
  const [field3Prompt, setField3Prompt] = useState({
    fieldName: field3,
    isChecked: true,
  });
  const [field1Result, setField1Result] = useState({
    fieldName: field1,
    result: "",
  });
  const [field2Result, setField2Result] = useState({
    fieldName: field2,
    result: "",
  });
  const [field3Result, setField3Result] = useState({
    fieldName: field3,
    result: "",
  });


  const vidTitleRaw = video?.data?.metadata.video_title;
  const vidTitleClean = decodeAndCleanFilename(vidTitleRaw);

  function decodeAndCleanFilename(filename) {
    const decodedFilename = decodeURIComponent(filename);
    const cleanedFilename = decodedFilename
      .replace(/%20/g, " ")
      .replace(/\([^)]*\)/g, "");
    return cleanedFilename;
  }

  return (
    <div className="VideoContents">
      <h1 className="appTitle">Summarize a Youtube Video</h1>
      {video.data ? <Video video={video} /> : <p>Please Upload a video</p>}
      {field1Result.result?.length > 0 ||
      field2Result.result?.length > 0 ||
      field3Result.result?.length > 0 ? (
        <div className="videoTitle">{vidTitleClean}</div>
      ) : null}{" "}
      {loading && <p>Loading...</p>}
      {!loading &&
        (field1Result.result?.length > 0 ||
          field2Result.result?.length > 0 ||
          field3Result.result?.length > 0) && (
          <Result
            video={video}
            field1Result={field1Result}
            field2Result={field2Result}
            field3Result={field3Result}
          />
        )}
    </div>
  );
}
