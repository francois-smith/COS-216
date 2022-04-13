<?php require_once("php/General/header.php"); ?>
<main>
    <section class="calendar-section">
        <div class="calendar-container">
            <div class="month">
                <i class="fas fa-angle-left prev"></i>
                <div class="date">
                    <h1>May</h1>
                    <p>Fri May 29, 2020</p>
                </div>
                <i class="fas fa-angle-right next"></i>
            </div>
            <div class="weekdays">
                <div>Sunday</div>
                <div>Monday</div>
                <div>Tue</div>
                <div>Wednesday</div>
                <div>Thursday</div>
                <div>Friday</div>
                <div>Saturday</div>
            </div>
            <div class="days-of-month"></div>
        </div>
        <div class="articles-section">
            <div class="articles-title">Articles</div>
            <div class="articles-container">
                <div onclick="goToLink(this)" style="display: none" class="article">
                    <i class="fas fa-angle-right"></i>
                    <div class="article-content">
                        <div class="article-date"></div>
                    <div class="article-title"></div> 
                    </div>
                    <a href="" class="link"></a>
                </div>
            </div>
        </div>
    </section>
</main>
<script src="JS/calendar.js"></script>
<?php require_once("php/General/footer.php"); ?>