// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from "next";
// import { groq } from "next-sanity";
// import { Tweet } from "@/typings";
// import { sanityClient } from "../../sanity";

// const feedQuery = groq`
//     *[_type == "tweet" && !blockTweet] {
//         _id,
//         ...
//     } | order(_createdAt desc)`;

// type Data = {
//   tweets: Tweet[];
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   const tweets: Tweet[] = await sanityClient.fetch(feedQuery);
//   console.log(tweets);
//   res.status(200).json({ tweets });
// }

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { Tweet } from "@/typings";
import { sanityClient } from "@/sanity";

const feedQuery = groq`
  *[_type == "tweet" && !blockTweet] {
    _id,
    ...
  } | order(_createdAt desc)
`;

type Data = {
  tweets: Tweet[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const tweets: Tweet[] = await sanityClient.fetch(feedQuery);
    console.log("Fetched tweets:", tweets);
    res.status(200).json({ tweets });
  } catch (error) {
    console.error("Error fetching tweets:", error);
    res.status(500).json({ tweets: [] });
  }
}
