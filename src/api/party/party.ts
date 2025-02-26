const getEventBanner = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/party/event`,
    );
    if (!response.ok) throw new Error(response.statusText);
    const data: getEventBannerRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
