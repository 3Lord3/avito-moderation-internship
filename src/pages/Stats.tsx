import {useParams} from "react-router-dom";

export default function Item() {
    const {id} = useParams();

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Item Page</h1>
            </div>
            <p>Item ID: {id}</p>
            <p>Item content will be here</p>
        </div>
    );
}
