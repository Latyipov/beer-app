export type BeerItem = {
  id: string;
  name: string;
  description: string;
  // we need this disable line because "image_url" coming from api object.
  // That there is no confusion with url element names we save this element with the same name.
  // eslint-disable-next-line camelcase
  image_url: string;
};
