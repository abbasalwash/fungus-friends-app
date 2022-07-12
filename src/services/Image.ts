export default async function imageApi(
  query: string,
  imagePerPage: number
): Promise<{ photos: Photo[] }> {
  const response = await fetch(
    `https://api.pexels.com/v1/search?query=${query}&per_page=${imagePerPage}`,
    {
      headers: {
        Authorization:
          '563492ad6f9170000100000125925b271f924750b465a367716be88f',
      },
    }
  );
  return response.json();
}

export interface Photo {
  src: {
    tiny: string;
  };
  alt: string;
}
