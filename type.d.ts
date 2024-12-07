declare type Sport = {
  sportName: string;
  sportHeader: string;
  sportIcon: string;
};
declare type Team = {
  teamName: string;
  teamSport: Sport;
  teamLogo: { asset: { url: string } };
  _id: string
};
