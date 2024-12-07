import { getSports, getTeamsBySport } from "@/sanity/lib";
import Link from "next/link";
import Image from "next/image";

interface SportPageProps {
  sport: Sport;
  teams: Array<Team>;
}

export default function SportPage(props: SportPageProps) {
  const { teams, sport } = props;
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {sport.sportHeader}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <Link href={`/${sport.sportName}/${team._id}`} key={team._id}>
            <div className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              {team.teamLogo?.asset?.url && (
                <div className="w-24 h-24 mx-auto mb-4">
                  <Image
                    src={team.teamLogo.asset.url}
                    alt={`${team.teamName} Logo`}
                    width={96}
                    height={96}
                    className="rounded-full object-cover"
                  />
                </div>
              )}
              <h2 className="text-xl font-semibold text-center">
                {team.teamName}
              </h2>
              <p className="text-gray-600 text-center mt-2">
                <strong>Sport:</strong> {team.teamSport?.sportName || "Unknown"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export const getStaticPaths = async () => {
  const sports = await getSports();
  const paths = sports.map((i: Sport) => ({ params: { sport: i.sportName } }));
  return { paths, fallback: "blocking" };
};
export const getStaticProps = async (obj: { params: { sport: string } }) => {
  const { params } = obj;
  const { sport } = params;
  const sports = await getSports();
  const selectedSport = sports.find((i: Sport) => i.sportName === sport);

  if (!selectedSport) {
    return { notFound: true };
  }
  const teams = await getTeamsBySport(sport);
  return { props: { sport: selectedSport, teams } };
};
