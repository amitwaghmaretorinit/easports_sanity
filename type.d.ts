declare type Sport = {
  sportName: string;
  sportHeader?: string;
  sportIcon?: { asset: { url: string } };
  _id: string;
};
declare type Team = {
  teamName: string;
  teamSport: Sport;
  teamLogo: { asset: { url: string } };
  _id: string
  teamFoundingYear: string | number;
  homeVenue?: string;
  championships?: number;
  roster?: { name: string; position: string; number: number }[];
  recentResults?: { opponent: string; result: 'W' | 'L' | 'D'; score: string; date: string }[];

};
