import React from "react";
import FeedCard from "./feedCard";

function Feed(props) {
  const { handleLike, addComments, beers } = props;
  return (
    <div>
      {beers.map((beer) => (
        <FeedCard
          key={beer.id}
          id={beer.id}
          name={beer.name}
          image={beer.image}
          comments={beer.comments}
          likes={beer.likes}
          tagLine={beer.tagLine}
          description={beer.description}
          handleLike={handleLike}
          addComments={addComments}
        />
      ))}
    </div>
  );
}

export default Feed;
