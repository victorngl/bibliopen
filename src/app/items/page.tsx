
import { FC } from "react";
import ItemForm from "@/components/layout/items/ItemForm";

interface ItemPageprops {
    children?: React.ReactNode,
    item?: Item
}

const ItemPage: FC<ItemPageprops> = ({ item, children }) => {
   
    return (
        <>  
           <ItemForm />
        </>
    )
}

export default ItemPage;
