interface EventBannerType {
  image: string;
  partyId: number;
}

interface getEventBannerRes {
  status: statusType;
  data: EventBannerType[];
}
