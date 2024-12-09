import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  try {
    const { _type, _id, teamSport } = req.body;
    if (_type !== "team") {
      return res.status(200).json({ message: "Not a relevant document type" });
    }

    if (_type === "team" && _id && teamSport.sportName) {
      console.log({teamSport})
      // await res.revalidate(`/${teamSport.sportName.toLowerCase()}/${_id}`);
      return res.json({
        revalidated: true,
        path: `/${teamSport.sportName.toLowerCase()}/${_id}`,
      });
    }

    return res.status(400).json({ message: "Invalid data from webhook" });
  } catch (error) {
    console.error("Error revalidating:", error);
    return res.status(500).json({ message: "Error revalidating", error });
  }
}
