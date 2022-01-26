
export const getPokemon = async (url: string): Promise<{} | undefined> => {

  return await fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      if (data.next) {
        return getPokemon(data.next);
      }
    })
}