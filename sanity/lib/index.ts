import { client } from "./client";

export const getPageInfo = async () => {
  return client.fetch(`*[_type == "pageInfo"][0]`);
};

export const getSports = async () => {
  return client.fetch(`*[_type == "sport"]{
    _id,
    sportName,
    sportHeader,
    sportIcon{
      asset->{
        url
      }
    }
    }`);
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
      sportName,
      sportHeader
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
