import React from "react";
import './css/Home.css';

function Home() {
    return (
        <div className="home-container">
            <h1 className="home-title">Air Quality Monitor</h1>
            
            {}
            <div className="card">
                <div className="card-content">
                    <p>
                    Managing and monitoring air quality is crucial for public health, the environment, and combating climate change. Poor air quality from pollutants like PM2.5, NO2, and O3 leads to respiratory and cardiovascular diseases, especially in vulnerable groups. It also harms the environment through acid rain, reduced agriculture, and biodiversity loss. Effective air quality management can identify pollution sources, enforce regulations, and promote sustainable practices, ultimately improving community health and the planet's well-being. Monitoring also raises public awareness and guides efforts to reduce exposure and emissions.
                    </p>
                </div>
            </div>

            {}
            <div className="card">
                <div className="card-content">
                    <p>
                    The Air Quality Index (AQI) is a system used to measure and communicate air quality. It translates pollution data into a simple, color-coded scale that indicates health risks. The AQI ranges from 0 to 500, with lower values indicating cleaner air. It focuses on key pollutants like PM2.5, PM10, ozone (O3), carbon monoxide (CO), sulfur dioxide (SO2), and nitrogen dioxide (NO2). The highest AQI value from these pollutants determines the overall score, helping individuals, especially those in sensitive groups, make informed decisions about outdoor activities and health precautions.
                </p>
                </div>
            </div>

            {}
            <div className="card">
                <div className="card-content">
                    <p>Oxygen (O₂) is essential for the survival of most living organisms, playing a key role in cellular respiration to produce energy. It makes up about 21% of the air we breathe and is crucial for maintaining bodily functions like brain activity and immune responses. While oxygen levels in the atmosphere are generally stable, they can decrease in enclosed or high-altitude environments, leading to hypoxia. Monitoring oxygen levels alongside other air quality parameters helps assess environmental conditions and their effects on health.</p>
                </div>
            </div>

            {}
            <div className="card">
                <div className="card-content">
                    <p>Carbon dioxide (CO₂) is a naturally occurring gas in the Earth's atmosphere, playing a crucial role in the planet's carbon cycle and as a greenhouse gas that helps regulate the Earth's temperature. While essential for processes like photosynthesis in plants, elevated levels of CO₂ can have adverse effects on both the environment and human health. Increased atmospheric CO₂, largely driven by human activities such as burning fossil fuels, deforestation, and industrial processes, contributes to global warming and climate change by trapping heat in the atmosphere. In indoor environments, high concentrations of CO₂ can lead to poor air quality, causing symptoms like drowsiness, headaches, and reduced cognitive function. Monitoring CO₂ levels is vital for maintaining air quality in enclosed spaces and for addressing broader environmental challenges related to climate change and sustainable living.</p>
                </div>
            </div>

            {}
            <div className="card">
                <div className="card-content">
                    <p>Particulate matter (PM) refers to a mixture of tiny solid particles and liquid droplets suspended in the air, which significantly impacts air quality and human health. Classified by size, PM10 includes particles with diameters of 10 microns or less, while PM2.5 consists of finer particles with diameters of 2.5 microns or less. Due to their small size, these particles can penetrate deep into the respiratory system and even enter the bloodstream, causing health issues such as asthma, bronchitis, cardiovascular diseases, and premature death. Particulate matter originates from various sources, including vehicle emissions, industrial processes, construction activities, and natural events like wildfires and dust storms. PM2.5, in particular, poses a greater health risk due to its ability to reach deeper parts of the lungs. Monitoring and controlling particulate matter levels are essential for improving air quality, reducing health risks, and creating safer environments, especially in urban and industrial areas.</p>
                </div>
            </div>

            {}
            <div className="card">
                <div className="card-content">
                    <p>Temperature plays a significant role in air quality, influencing the behavior, concentration, and distribution of pollutants in the atmosphere. High temperatures can accelerate chemical reactions that produce ground-level ozone (O₃), a harmful pollutant and key component of smog, particularly in urban areas. During heatwaves, stagnant air conditions can trap pollutants close to the ground, exacerbating air quality issues and increasing health risks such as respiratory problems and heat-related illnesses. Conversely, colder temperatures can lead to the accumulation of pollutants like particulate matter (PM2.5 and PM10) due to temperature inversions, where a layer of warm air traps cooler air and pollutants near the surface. Understanding the interplay between temperature and air quality is essential for predicting pollution levels, issuing health advisories, and designing strategies to mitigate the impact of climate and weather patterns on air pollution.</p>
                </div>
            </div>

            {}
            <div className="card">
                <div className="card-content">
                    <p>Humidity, the amount of moisture in the air, has a profound impact on air quality and the behavior of pollutants. High humidity levels can promote the formation of secondary pollutants like particulate matter (PM2.5), as water vapor interacts with airborne chemicals to create fine particles. It can also exacerbate the health effects of pollutants by making it harder for the body to cool down, increasing stress on the respiratory and cardiovascular systems. On the other hand, low humidity can dry out mucous membranes, making individuals more susceptible to respiratory infections and irritation from dust and airborne particles. Additionally, humidity influences the spread and survival of airborne pathogens, further affecting indoor and outdoor air quality. Monitoring humidity alongside other air quality parameters is critical for assessing environmental conditions and ensuring healthier living spaces.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
