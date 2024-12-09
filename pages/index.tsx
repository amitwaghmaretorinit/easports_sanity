import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/ui/header";
import { getPageInfo, getSports } from "@/sanity/lib";
import Image from "next/image";
import Link from "next/link";

interface HomeProps {
  sports: Array<Sport>;
  pageInfo: { pageTitle: string };
}
export default function Home(props: HomeProps) {
  const { sports,pageInfo } = props;
  return (
    <div className="min-h-screen m-10">
      <Header title={pageInfo.pageTitle} />
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sports.map((sport) => (
            <Link
              href={`/${sport.sportName}/`}
              key={sport._id}
              className="transform hover:scale-105 transition-transform duration-300"
            >
              <Card className="overflow-hidden m-2">
                <div className="relative h-48 bg-gradient-to-r from-blue-500 to-blue-700">
                  {sport.sportIcon?.asset?.url && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src={sport.sportIcon.asset.url}
                        alt={`${sport.sportHeader} Logo`}
                        width={120}
                        height={120}
                        className="rounded-full border-4 border-white shadow-lg object-cover"
                      />
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold text-center mb-2">
                    {sport.sportHeader}
                  </h2>

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

export const getServerSideProps = async () => {
  const sports = await getSports();
  const pageInfo = await getPageInfo();
  return { props: { sports, pageInfo } };
};
