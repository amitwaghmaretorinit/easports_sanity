import { getSports, getTeamsBySport } from "@/sanity/lib";
import Link from "next/link";
import Image from "next/image";
import { CardContent, Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/ui/header";

interface SportPageProps {
  sport: Sport;
  teams: Array<Team>;
}

export default function SportPage(props: SportPageProps) {
  const { teams, sport } = props;
  return (
    <div className="min-h-screen">
      <Header title={sport.sportHeader || ""} />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">
          {sport.sportHeader}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teams.map((team) => (
            <Link
              href={`/${sport.sportName}/${team._id}`}
              key={team._id}
              className="transform hover:scale-105 transition-transform duration-300"
            >
              <Card className="overflow-hidden m-2">
                <div className="relative h-48 bg-gradient-to-r from-blue-500 to-blue-700">
                  {team.teamLogo?.asset?.url && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src={team.teamLogo.asset.url}
                        alt={`${team.teamName} Logo`}
                        width={120}
                        height={120}
                        className="rounded-full border-4 border-white shadow-lg"
                      />
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold text-center mb-2">
                    {team.teamName}
                  </h2>
                  <div className="flex justify-center">
                    <Badge variant="secondary" className="mt-2">
                      {team.teamSport?.sportHeader || "Unknown Sport"}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-center mt-4 text-sm">
                    Click to view team details
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
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
