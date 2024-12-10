import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/ui/header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTeamById, getTeams } from "@/sanity/lib";
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  ChevronUp,
  MapPin,
  Trophy,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

interface TeamDetailsProps {
  team: Team;
}
export default function TeamDetails({ team }: TeamDetailsProps) {
  const router = useRouter();
  const [showFullRoster, setShowFullRoster] = useState(false);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const displayedRoster = showFullRoster
    ? team.roster
    : team.roster?.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br  via-white to-purple-100 p-8">
      <Header title={team.teamName} />
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-8 flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Teams
        </Button>

        <div>
          <Card className="overflow-hidden backdrop-blur-sm shadow-xl">
            <div className="relative h-64 bg-gradient-to-r from-blue-500 to-purple-600">
              {team.teamLogo?.asset?.url && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={team.teamLogo.asset.url}
                    alt={`${team.teamName} Logo`}
                    width={200}
                    height={200}
                    className="rounded-full border-4 border-white shadow-lg"
                  />
                </div>
              )}
            </div>
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-center text-gray-800">
                {team.teamName}
              </CardTitle>
              <div className="flex justify-center mt-2">
                <Badge variant="secondary" className="text-lg px-4 py-1">
                  {team.teamSport?.sportName || "Unknown Sport"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                <div className="flex flex-col items-center">
                  <Calendar className="h-8 w-8 mb-2 text-blue-600" />
                  <span className="text-sm text-gray-600">Founded</span>
                  <span className="font-semibold">
                    {team.teamFoundingYear || "Unknown"}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <MapPin className="h-8 w-8 mb-2 text-blue-600" />
                  <span className="text-sm text-gray-600">Home Venue</span>
                  <span className="font-semibold">
                    {team.homeVenue || "Unknown"}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <Trophy className="h-8 w-8 mb-2 text-blue-600" />
                  <span className="text-sm text-gray-600">Championships</span>
                  <span className="font-semibold">
                    {team.championships || 0}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <Users className="h-8 w-8 mb-2 text-blue-600" />
                  <span className="text-sm text-gray-600">Roster Size</span>
                  <span className="font-semibold">
                    {team.roster?.length || 0}
                  </span>
                </div>
              </div>

              <Tabs defaultValue="roster" className="mt-8">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="roster">Team Roster</TabsTrigger>
                  <TabsTrigger value="results">Recent Results</TabsTrigger>
                </TabsList>
                <TabsContent value="roster">
                  {team.roster && team.roster.length > 0 && (
                    <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {displayedRoster?.map((player, index) => (
                          <div
                            key={index}
                            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                          >
                            <p className="font-semibold text-lg">
                              {player.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {player.position}
                            </p>
                            <p className="text-sm text-gray-500">
                              #{player.number}
                            </p>
                          </div>
                        ))}
                      </div>
                      {team.roster.length > 6 && (
                        <Button
                          variant="outline"
                          onClick={() => setShowFullRoster(!showFullRoster)}
                          className="mt-4 w-full"
                        >
                          {showFullRoster ? (
                            <>
                              <ChevronUp className="mr-2 h-4 w-4" />
                              Show Less
                            </>
                          ) : (
                            <>
                              <ChevronDown className="mr-2 h-4 w-4" />
                              Show Full Roster
                            </>
                          )}
                        </Button>
                      )}
                    </ScrollArea>
                  )}
                </TabsContent>
                <TabsContent value="results">
                  {team.recentResults && team.recentResults.length > 0 ? (
                    <ScrollArea className="h-[400px] w-full rounded-md border">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="p-2 text-left">Date</th>
                            <th className="p-2 text-left">Opponent</th>
                            <th className="p-2 text-center">Result</th>
                            <th className="p-2 text-right">Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {team.recentResults.map((result, index) => (
                            <tr
                              key={index}
                              className="border-b last:border-b-0"
                            >
                              <td className="p-2">{result.date}</td>
                              <td className="p-2">{result.opponent}</td>
                              <td className="p-2 text-center">
                                <Badge
                                  variant={
                                    result.result === "W"
                                      ? "default"
                                      : result.result === "L"
                                        ? "destructive"
                                        : "secondary"
                                  }
                                >
                                  {result.result}
                                </Badge>
                              </td>
                              <td className="p-2 text-right">{result.score}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </ScrollArea>
                  ) : (
                    <p className="text-center text-gray-500 mt-4">
                      No recent results available.
                    </p>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
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
  const team: Team = await getTeamById(params.teamId);
  console.log(team.homeVenue);
  return { props: { team }, revalidate: 10 };
};
