import { client } from "./client";

export const getSports = async () => {
  return client.fetch(`*[_type == "sport"]`);
};

export const getTeamsBySport = async (sportName: string) => {
  const query = `*[_type == "team" && teamSport->sportName == $sportName]{
    _id,
    teamName,
    teamLogo{
      asset->{
        url
      }
    },
    teamSport->{
      sportName
    }
  }`;
  return client.fetch(query, { sportName });
};

export const getTeamById = async (id: string) => {
  const query = `*[_type == "team" && _id == $id][0]{
    _id,
    teamName,
    teamFoundingYear,
    homeVenue,
    championships,
    teamLogo{
      asset->{
        url
      }
    },
    teamSport->{
      sportName
    }
  }`;
  return client.fetch(query, { id });
};

export const getTeams = async () => {
  const teams = await client.fetch(`*[_type == "team"]{
    _id,
    teamSport->{
      sportName
  }
    }`);
  return teams;
};
