const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

async function getChannelVideos(channelId: string) {
  // Build the URL for the API request
  var url =
    "https://www.googleapis.com/youtube/v3/search" +
    "?part=snippet&maxResults=50&channelId=" +
    channelId +
    "&key=" +
    apiKey;

  try {
    // Make the API request using fetch
    const response = await fetch(url);

    if (response.status !== 200) {
      throw new Error(
        "It seems there is a problem. Status Code: " + response.status
      );
    }

    // Parse the JSON from the response
    const data = await response.json();
    console.log("raw data from video by channelId: ", data);

    const formattedData = data?.items
      ?.map((item: any) => ({
        title: item?.snippet?.title,
        thumbnail: item?.snippet?.thumbnails?.default?.url,
        videoId: item?.id?.videoId,
      }))
      ?.filter((item: any) => item.videoId !== undefined);

    console.log("this is not a promise: formattedData: ", formattedData);

    return formattedData;
  } catch (err) {
    console.error("Fetch Error: ", err);
  }
}

const getChannelIdFromUsername = async (username: string) => {
  console.log("username: ", username, apiKey);
  var url =
    "https://www.googleapis.com/youtube/v3/channels" +
    "?part=id" +
    "&forUsername=" +
    username +
    "&key=" +
    apiKey;
  try {
    // Make the API request using fetch
    const response = await fetch(url);

    if (response.status !== 200) {
      console.error(
        "It seems there is a problem. Status Code: " + response.status
      );
      return;
    }
    // Parse the JSON from the response
    const resParsed = await response.json();
    console.log(resParsed);

    // Check if the channel is found
    if (resParsed.items.length > 0) {
      console.log("Channel ID: " + resParsed.items[0].id);
      return resParsed.items[0].id;
    } else {
      console.log("No channel found for username: " + username);
      return "";
    }
  } catch (err) {
    console.error("Fetch Error: ", err);
  }
};
export { getChannelVideos, getChannelIdFromUsername };
