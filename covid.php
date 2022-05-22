<?php require_once("php/General/header.php"); ?>
<main>
    <section id="covid-section">
        <div id="graph-container">
            <canvas id="statsChart"></canvas>
        </div>
        <div class="container">
            <div class="Overall-stats grid-container">
                <div class="counter">
                    <span class="counter-title">Global Cases</span>
                    <span class="counter-amount" style="color: #2a81ea;"></span>
                    <span class="counter-new" style="color: #2a80eaa8;"></span>
                </div>
                <div class="counter">
                    <span class="counter-title">Global Recoveries</span>
                    <span class="counter-amount" style="color: #2eaa49;"></span>
                    <span class="counter-new" style="color: #2eaa49b0;"></span>
                </div>
                <div class="counter">
                    <span class="counter-title">Global Deaths</span>
                    <span class="counter-amount" style="color: #ff5f5f;"></span>
                    <span class="counter-new" style="color: #ff5f5faf;"></span>
                </div>
            </div>
            <div div="scroll-container">
                <div class="scroll-text"></div>
            </div>
            <div class="cfr-ifr-container grid-container">
                <div class="ifr">
                    <img  src="img/SVG/blood.svg" alt="drop">
                    <div class="ifr-info">
                        <span class="ifr-title counter-title">IFR Rate</span>
                        <span class="ifr-amount counter-amount" style="color: #969696;"></span>
                    </div>
                </div>
                <div class="critical-cases">
                        <span class="counter-title">Active Cases</span>
                        <span class="counter-amount" style="color: #969696;"></span>
                </div>
                <div class="cfr">
                    <img src="img/SVG/case.svg" alt="case">
                    <div class="cfr-info">
                        <span class="cfr-title counter-title">CFR Rate</span>
                        <span class="cfr-amount counter-amount" style="color: #969696;"></span>
                    </div>
                </div>
            </div>
            <div class="infographic">
                <div id="infographic-container">
                    <div id="infographic-title">
                        <span id="infographic-main">CORONA</span>
                        <div id="infographic-float-container">
                            <span id="infographic-float">COVID-19</span>
                            <span id="infographic-main2">VIRUS</span>
                        </div>
                    </div>
                    <p id="infographic-text">
                        The Coronavirus (COVID-19) was first reported in Wuhan, Hubei, China in December 2019, the outbreak was later recognized as a pandemic by the World Health Organization (WHO) on 11 March 2020.
                    </p>
                </div>
                <img src="img/infographic.png" alt="Covid Infographic">
            </div>
            <div class="circle-graph grid-container">
                <h3>Cases vs Recoveries</h3>
                <canvas id="doughnut" height="220"></canvas>
                <canvas id="tooltip-canvas" width="150" height="100"></canvas>
            </div>
            <div class="cases-today grid-container stat-card">
                <img class="stat-image" src="img/SVG/covid-svgrepo-com.svg" alt="covid">
                <div class="stat-info">
                    <span class="stat-title">South Africa New Cases</span>
                    <span class="stat-amount"></span>
                </div>
            </div>
            <div class="deaths-today grid-container stat-card">
                <img class="stat-image" src="img/SVG/skull.svg" alt="bed">
                <div class="stat-info">
                    <span class="stat-title">South Africa New Deaths</span>
                    <span class="stat-amount"></span>
                </div>
            </div>
            <div class="mortality grid-container stat-card">
                <img class="stat-image" src="img/SVG/pulse.svg" alt="pulse">
                <div class="stat-info">
                    <span class="stat-title">Mortailty Rate</span>
                    <span class="stat-amount"></span>
                </div>
            </div>
            <div class="CRD grid-container stat-card">
                <img class="stat-image" src="img/SVG/clipboard.svg" alt="clipboard">
                <div class="stat-info">
                    <span class="stat-title">C:R:D Ratio</span>
                    <span class="stat-amount"></span>
                </div>
            </div>
        </div>
    </section>
</main>
<script src="JS/graphs/CircleChart.js"></script>
<script src="JS/graphs/TotalStatistics.js"></script>
<script src="JS/covid.js"></script>

<?php require_once("php/General/footer.php"); ?>