import UserManagement from "./UserManagement";
import NewsAggregator from "./NewsAggregator";
import WeatherApp from "./WeatherApp";

export default function AW5C2() {
    return(
        <div>
            <h2>Module 5.2: API Integration & Data Fetching</h2>
            <div>
                <h3>Example 1</h3>
                <div className="card">
                    <UserManagement />
                </div>
            </div>
            <hr />
            <div>
                <h3>Exercise 1: News Aggregator</h3>
                <div className="card">
                    <NewsAggregator />
                </div>
            </div>
            <hr />
            <div>
                <h3>Exercise 2: Weather Forecast App</h3>
                <div className="card">
                    <WeatherApp />
                </div>
            </div>
        </div>
    )
}