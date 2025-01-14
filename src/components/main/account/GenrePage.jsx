import { useParams } from "react-router-dom";
import RandomImage from "./RandomImage";
import FilteredCards from "./FilteredCards";

function GenrePage() {
    const { header, genreId, genreName } = useParams()
    return (
        <div className="bg-[#141414]">
            <RandomImage header={header} genreId={parseInt(genreId)} type={header} genreName={genreName} />
            <FilteredCards header={header} genreId={parseInt(genreId)} genreName={genreName}/>
        </div>
    );
}

export default GenrePage;
