import { useNavigate } from "react-router-dom";
import {DirectoryItemConatiner, BackgroundImage, Body} from "./directory-item.style";

function DirectoryItem({id, title, imageUrl, route}) {
    const navigate = useNavigate();
    const onNavigateHandler = () => navigate(route);
    
    return (
        <DirectoryItemConatiner onClick={onNavigateHandler}>
            <BackgroundImage imageUrl={imageUrl} />
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemConatiner>
    )
}

export default DirectoryItem;