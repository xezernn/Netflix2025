import { useContext } from "react";
import Media from "./Media"
import RandomImage from "./RandomImage"

function Movies() {
  return (
    <>
      <RandomImage type="movies" header="Movies"/>
      <Media type="movies" />
    </>
  )
}
export default Movies