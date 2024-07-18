import { useEffect, useState } from "react";
import { healthCheck } from "../../api-config/api"; 

const HealthCheck = () => {
    const [health, setHealth] = useState("");

    useEffect(() => {
        const getHealth = async () => {
            try {
                const resp = await healthCheck();
                setHealth(resp.data);
            } catch (error) {
                console.error("Error fetching health check:", error);
                setHealth("Error fetching health check");
            }
        };

        getHealth(); 
    }, []);

    return (
        <h1>{health}</h1>
    );
};

export default HealthCheck;
