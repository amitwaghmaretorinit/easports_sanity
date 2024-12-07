import { getTeamById, getTeams } from "@/sanity/lib";
import Image from "next/image";
import { useRouter } from "next/router";
interface TeamDetailsProps {
  team: Team;
}
export default function TeamDetails({ team }: TeamDetailsProps) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <button
        onClick={() => router.back()}
        className="mb-4 text-blue-600 hover:underline"
      >
        Back
      </button>
      <div className="flex flex-col items-center text-center">
        {team.teamLogo?.asset?.url && (
          <Image
            src={team.teamLogo.asset.url}
            alt={`${team.teamName} Logo`}
            width={150}
            height={150}
            className="rounded-full object-cover"
          />
        )}
        <h1 className="text-3xl font-bold mt-4">{team.teamName}</h1>
        <p className="text-gray-600 mt-2">
          <strong>Sport:</strong> {team.teamSport?.sportName || "Unknown"}
        </p>
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  const teams = await getTeams(); // Fetch all teams

  const paths = teams.map((team: Team) => {
    return {
      params: {
        sport: team.teamSport.sportName.toLowerCase(),
        teamId: team._id,
      },
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { sport: string; teamId: string };
}) => {
  const team = await getTeamById(params.teamId);
  return { props: { team } };
};
