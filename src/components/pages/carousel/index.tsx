import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";

import type { FC } from "react";

import useTopics from "@api/useTopics";
import useImages from "@api/useImages";

import type { GetTopicsResponse } from "@data/topics";
import type { GetImagesByTopicResponse } from "@data/images";

import "./style";

const Carousel: FC = (): JSX.Element => {
  const [selectedTopic, setSelectedTopic] = useState<GetTopicsResponse>();
  const { loading, data } = useTopics();
  const imagesResponse = useImages(
    selectedTopic ? selectedTopic.id : "4cFiN9pfkxU",
  );

  useEffect(() => {
    if (data) {
      setSelectedTopic(data[0]);
    }
  }, [data]);

  return (
    <>
      {loading && (
        <Box
          id="carousel"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress color="secondary" />
        </Box>
      )}
      {!loading && (
        <Box id="carousel" display="flex">
          <>
            <div id="menu">
              {data.map((topic, index) => (
                <div
                  key={index}
                  className={
                    "item" +
                    (selectedTopic && selectedTopic.id === topic.id
                      ? " active"
                      : "")
                  }
                  onClick={(event) => setSelectedTopic(topic)}
                >
                  {topic.title}
                </div>
              ))}
            </div>
            <div id="images">
              {imagesResponse.loading && (
                <CircularProgress color="secondary" className="image-loader" />
              )}
              {!imagesResponse.loading &&
                imagesResponse.data.map(
                  (image: GetImagesByTopicResponse, index: number) => (
                    <div key={index} className="image">
                      <img src={image.links.download} loading="lazy" />
                    </div>
                  ),
                )}
            </div>
          </>
        </Box>
      )}
    </>
  );
};

export default Carousel;
