from app import app
from models import db, Product, User, Order, OrderItem
from faker import Faker
import random

with app.app_context():
    Faker.seed(0)
    fake = Faker()

    print("Deleting existing data...")
    OrderItem.query.delete()
    Order.query.delete()
    Product.query.delete()
    User.query.delete()
    db.session.commit()

    print("Creating users...")
    users = []
    for _ in range(5):
        user = User(
            username=fake.user_name(),
            email=fake.email()
        )
        user.password_hash = "password" # All users have password 'password'
        users.append(user)
        db.session.add(user)
    db.session.commit()

    print("Creating curated products...")
    products_data = [
        # ---------------- ELECTRONICS (20) ----------------
        {"name": "Apple iPhone 14 Pro", "price": 999.00, "description": "6.1-inch Super Retina XDR display, A16 Bionic chip, Pro camera system.", "image_url": "https://source.unsplash.com/800x600/?iphone,electronics", "stock": 45, "category": "Electronics"},
        {"name": "Samsung Galaxy S23 Ultra", "price": 1199.00, "description": "200MP camera, dynamic AMOLED, powerful performance for pro users.", "image_url": "https://source.unsplash.com/800x600/?samsung,galaxy,electronics", "stock": 30, "category": "Electronics"},
        {"name": "Sony WH-1000XM5 Headphones", "price": 349.99, "description": "Industry-leading noise cancelling wireless headphones with long battery life.", "image_url": "https://source.unsplash.com/800x600/?sony,headphones,electronics", "stock": 60, "category": "Electronics"},
        {"name": "Apple MacBook Air M2 (13-inch)", "price": 1199.00, "description": "Thin and light laptop with Apple M2 chip and excellent battery life.", "image_url": "https://source.unsplash.com/800x600/?macbook,laptop,electronics", "stock": 25, "category": "Electronics"},
        {"name": "Dell XPS 13", "price": 1099.00, "description": "Premium ultrabook with 13.4-inch InfinityEdge display and Intel Core i7.", "image_url": "https://source.unsplash.com/800x600/?dell,laptop,electronics", "stock": 22, "category": "Electronics"},
        {"name": "Apple AirPods Pro (2nd Gen)", "price": 249.00, "description": "Active noise cancellation, improved transparency mode, spatial audio.", "image_url": "https://source.unsplash.com/800x600/?airpods,electronics", "stock": 80, "category": "Electronics"},
        {"name": "Samsung Galaxy Tab S8", "price": 699.00, "description": "High-refresh tablet for productivity and media consumption.", "image_url": "https://source.unsplash.com/800x600/?samsung,tablet,electronics", "stock": 28, "category": "Electronics"},
        {"name": "Nintendo Switch OLED", "price": 349.99, "description": "Portable and docked console with OLED screen and enhanced audio.", "image_url": "https://source.unsplash.com/800x600/?nintendo,switch,electronics", "stock": 55, "category": "Electronics"},
        {"name": "GoPro HERO11 Black", "price": 399.99, "description": "Action camera with improved stabilization and 5.3K video capture.", "image_url": "https://source.unsplash.com/800x600/?gopro,camera,electronics", "stock": 40, "category": "Electronics"},
        {"name": "Sony A7 IV Mirrorless Camera", "price": 2499.00, "description": "Full-frame mirrorless camera for professional photography and video.", "image_url": "https://source.unsplash.com/800x600/?sony,camera,electronics", "stock": 12, "category": "Electronics"},
        {"name": "Bose QuietComfort Earbuds II", "price": 279.00, "description": "True wireless earbuds with adjustable noise cancelling.", "image_url": "https://source.unsplash.com/800x600/?bose,earbuds,electronics", "stock": 65, "category": "Electronics"},
        {"name": "Razer Blade 15 Gaming Laptop", "price": 1899.00, "description": "High-performance gaming laptop with RTX-series GPU and fast display.", "image_url": "https://source.unsplash.com/800x600/?razer,laptop,gaming,electronics", "stock": 18, "category": "Electronics"},
        {"name": "Logitech MX Master 3 Mouse", "price": 99.99, "description": "Ergonomic wireless mouse built for productivity.", "image_url": "https://source.unsplash.com/800x600/?logitech,mouse,electronics", "stock": 120, "category": "Electronics"},
        {"name": "Anker 65W Power Delivery Charger", "price": 39.99, "description": "Compact USB-C charger for fast charging laptops and phones.", "image_url": "https://source.unsplash.com/800x600/?anker,charger,electronics", "stock": 150, "category": "Electronics"},
        {"name": "Samsung 65\" QLED 4K Smart TV", "price": 999.99, "description": "Vivid QLED panel with smart TV features and HDR support.", "image_url": "https://source.unsplash.com/800x600/?samsung,tv,electronics", "stock": 20, "category": "Electronics"},
        {"name": "Philips Hue Starter Kit (3 bulbs)", "price": 179.99, "description": "Smart lights with voice control and full color spectrum.", "image_url": "https://source.unsplash.com/800x600/?philips,hue,lights,electronics", "stock": 60, "category": "Electronics"},
        {"name": "Ring Video Doorbell 4", "price": 199.99, "description": "HD video doorbell with two-way talk and motion detection.", "image_url": "https://source.unsplash.com/800x600/?ring,doorbell,electronics", "stock": 45, "category": "Electronics"},
        {"name": "Eero Pro Mesh Wi-Fi 6", "price": 299.99, "description": "Whole-home mesh Wi-Fi system for fast, reliable connectivity.", "image_url": "https://source.unsplash.com/800x600/?eero,wifi,electronics", "stock": 35, "category": "Electronics"},
        {"name": "JBL Charge 5 Bluetooth Speaker", "price": 179.95, "description": "Portable speaker with powerful sound and long battery life.", "image_url": "https://source.unsplash.com/800x600/?jbl,speaker,electronics", "stock": 90, "category": "Electronics"},
        {"name": "Seagate 2TB Portable SSD", "price": 129.99, "description": "High-speed external SSD for backups and media.", "image_url": "https://source.unsplash.com/800x600/?seagate,ssd,electronics", "stock": 110, "category": "Electronics"},

        # ---------------- FASHION (20) ----------------
        {"name": "Nike Air Max 270", "price": 149.99, "description": "Iconic Nike lifestyle sneaker with Air cushioning for comfort.", "image_url": "https://source.unsplash.com/800x600/?nike,sneakers,fashion", "stock": 120, "category": "Fashion"},
        {"name": "Adidas Ultraboost 22", "price": 179.99, "description": "Responsive running shoe with Boost cushioning for long runs.", "image_url": "https://source.unsplash.com/800x600/?adidas,running,shoes,fashion", "stock": 95, "category": "Fashion"},
        {"name": "Levi's 501 Original Jeans", "price": 69.50, "description": "Classic straight-leg denim with durable construction.", "image_url": "https://source.unsplash.com/800x600/?levis,jeans,fashion", "stock": 140, "category": "Fashion"},
        {"name": "Patagonia Nano Puff Jacket", "price": 199.00, "description": "Lightweight insulated jacket for cold-weather layering.", "image_url": "https://source.unsplash.com/800x600/?patagonia,jacket,fashion", "stock": 60, "category": "Fashion"},
        {"name": "Gucci GG Marmont Small Bag", "price": 1190.00, "description": "Designer crossbody bag with signature double-G logo.", "image_url": "https://source.unsplash.com/800x600/?gucci,bag,fashion", "stock": 8, "category": "Fashion"},
        {"name": "Ray-Ban Wayfarer Sunglasses", "price": 154.00, "description": "Classic sunglass shape with polarized lens options.", "image_url": "https://source.unsplash.com/800x600/?rayban,sunglasses,fashion", "stock": 200, "category": "Fashion"},
        {"name": "H&M Linen Summer Dress", "price": 39.99, "description": "Breathable linen blend dress ideal for warm weather.", "image_url": "https://source.unsplash.com/800x600/?dress,fashion", "stock": 150, "category": "Fashion"},
        {"name": "Zara Faux Leather Jacket", "price": 129.00, "description": "Modern slim-fit faux-leather jacket for everyday style.", "image_url": "https://source.unsplash.com/800x600/?leather,jacket,fashion", "stock": 85, "category": "Fashion"},
        {"name": "Under Armour Tech T-Shirt", "price": 24.99, "description": "Moisture-wicking performance tee for workouts.", "image_url": "https://source.unsplash.com/800x600/?tshirt,fashion", "stock": 300, "category": "Fashion"},
        {"name": "Uniqlo Ultra Light Down Vest", "price": 69.90, "description": "Packable down vest for lightweight insulation.", "image_url": "https://source.unsplash.com/800x600/?uniqlo,vest,fashion", "stock": 95, "category": "Fashion"},
        {"name": "Converse Chuck Taylor All Star", "price": 55.00, "description": "Timeless canvas sneakers for every day.", "image_url": "https://source.unsplash.com/800x600/?converse,sneakers,fashion", "stock": 220, "category": "Fashion"},
        {"name": "Coach Tabby Shoulder Bag", "price": 395.00, "description": "Refined shoulder bag with elegant hardware.", "image_url": "https://source.unsplash.com/800x600/?coach,bag,fashion", "stock": 30, "category": "Fashion"},
        {"name": "Columbia Waterproof Hiking Boots", "price": 129.99, "description": "Durable, waterproof boots for trail adventures.", "image_url": "https://source.unsplash.com/800x600/?hiking,boots,fashion", "stock": 70, "category": "Fashion"},
        {"name": "Swarovski Crystal Earrings", "price": 89.00, "description": "Elegant crystal drop earrings suitable for formal wear.", "image_url": "https://source.unsplash.com/800x600/?earrings,fashion", "stock": 65, "category": "Fashion"},
        {"name": "Lululemon Align Leggings", "price": 98.00, "description": "High-rise seamless leggings for comfort and mobility.", "image_url": "https://source.unsplash.com/800x600/?lululemon,leggings,fashion", "stock": 140, "category": "Fashion"},
        {"name": "The North Face Summit Hoodie", "price": 129.00, "description": "Technical hoodie built for warmth and movement.", "image_url": "https://source.unsplash.com/800x600/?northface,hoodie,fashion", "stock": 105, "category": "Fashion"},
        {"name": "Timberland Classic Boots", "price": 150.00, "description": "Durable work-boot aesthetic with premium leather.", "image_url": "https://source.unsplash.com/800x600/?timberland,boots,fashion", "stock": 90, "category": "Fashion"},
        {"name": "Hermès Silk Scarf", "price": 450.00, "description": "Luxury silk scarf with iconic print and finish.", "image_url": "https://source.unsplash.com/800x600/?hermes,scarf,fashion", "stock": 6, "category": "Fashion"},
        {"name": "Nike Dri-FIT Training Shorts", "price": 29.99, "description": "Breathable shorts designed for high-intensity workouts.", "image_url": "https://source.unsplash.com/800x600/?nike,shorts,fashion", "stock": 210, "category": "Fashion"},
        {"name": "Bose Frames Audio Sunglasses", "price": 199.00, "description": "Sunglasses with integrated open-ear audio.", "image_url": "https://source.unsplash.com/800x600/?bose,sunglasses,fashion", "stock": 45, "category": "Fashion"},

        # ---------------- HOME & KITCHEN (20) ----------------
        {"name": "Instant Pot Duo 7-in-1", "price": 99.95, "description": "Multi-use pressure cooker and slow cooker for quick meals.", "image_url": "https://source.unsplash.com/800x600/?instantpot,kitchen", "stock": 80, "category": "Home & Kitchen"},
        {"name": "KitchenAid Artisan Stand Mixer", "price": 379.99, "description": "Professional stand mixer with versatile attachments.", "image_url": "https://source.unsplash.com/800x600/?kitchenaid,mixer,kitchen", "stock": 35, "category": "Home & Kitchen"},
        {"name": "Dyson V11 Cordless Vacuum", "price": 599.99, "description": "High-suction cordless vacuum with smart cleaning modes.", "image_url": "https://source.unsplash.com/800x600/?dyson,vacuum,home", "stock": 20, "category": "Home & Kitchen"},
        {"name": "Nespresso Vertuo Coffee Machine", "price": 189.00, "description": "Single-serve coffee maker for rich espresso and lungo.", "image_url": "https://source.unsplash.com/800x600/?nespresso,coffee,kitchen", "stock": 60, "category": "Home & Kitchen"},
        {"name": "Vitamix Professional Blender", "price": 449.95, "description": "High-performance blender for smoothies and soups.", "image_url": "https://source.unsplash.com/800x600/?vitamix,blender,kitchen", "stock": 28, "category": "Home & Kitchen"},
        {"name": "Philips Air Fryer XXL", "price": 299.99, "description": "Large-capacity air fryer for healthier frying options.", "image_url": "https://source.unsplash.com/800x600/?airfryer,kitchen", "stock": 55, "category": "Home & Kitchen"},
        {"name": "Le Creuset Dutch Oven (5.5 qt)", "price": 329.00, "description": "Enamel-coated cast iron for slow cooking and roasting.", "image_url": "https://source.unsplash.com/800x600/?lecreuset,dutchoven,kitchen", "stock": 18, "category": "Home & Kitchen"},
        {"name": "Smeg Retro Toaster (2-Slice)", "price": 199.99, "description": "Stylish retro toaster with durable metal housing.", "image_url": "https://source.unsplash.com/800x600/?smeg,toaster,kitchen", "stock": 40, "category": "Home & Kitchen"},
        {"name": "Breville Espresso Machine", "price": 699.00, "description": "Barista-quality espresso machine with precise temperature control.", "image_url": "https://source.unsplash.com/800x600/?breville,espresso,kitchen", "stock": 22, "category": "Home & Kitchen"},
        {"name": "Georgette Non-Stick Cookware Set (10-piece)", "price": 249.00, "description": "Durable non-stick set for everyday cooking.", "image_url": "https://source.unsplash.com/800x600/?cookware,kitchen", "stock": 75, "category": "Home & Kitchen"},
        {"name": "Shark Robot Vacuum with XL Dust Cup", "price": 229.99, "description": "Smart robot vacuum that navigates and cleans automatically.", "image_url": "https://source.unsplash.com/800x600/?robot,vacuum,home", "stock": 45, "category": "Home & Kitchen"},
        {"name": "Zwilling Knife Block Set (15-piece)", "price": 299.99, "description": "High-carbon stainless steel knives with ergonomic handles.", "image_url": "https://source.unsplash.com/800x600/?knives,kitchen", "stock": 25, "category": "Home & Kitchen"},
        {"name": "SodaStream Fizzi Sparkling Water Maker", "price": 89.99, "description": "Make sparkling water at home with reusable bottles.", "image_url": "https://source.unsplash.com/800x600/?sodastream,kitchen", "stock": 90, "category": "Home & Kitchen"},
        {"name": "Oxo Brew Conical Burr Coffee Grinder", "price": 149.99, "description": "Consistent grind quality for pour-over and espresso.", "image_url": "https://source.unsplash.com/800x600/?coffee,grinder,kitchen", "stock": 65, "category": "Home & Kitchen"},
        {"name": "Casper Original Mattress (Queen)", "price": 995.00, "description": "Medium-firm foam mattress with zoned support.", "image_url": "https://source.unsplash.com/800x600/?mattress,home", "stock": 10, "category": "Home & Kitchen"},
        {"name": "Levoit Air Purifier (H13 HEPA)", "price": 129.99, "description": "HEPA filtration to reduce airborne allergens and particles.", "image_url": "https://source.unsplash.com/800x600/?airpurifier,home", "stock": 70, "category": "Home & Kitchen"},
        {"name": "Cuisinart 14-Cup Food Processor", "price": 199.00, "description": "Large-capacity processor with multiple blades and discs.", "image_url": "https://source.unsplash.com/800x600/?foodprocessor,kitchen", "stock": 36, "category": "Home & Kitchen"},
        {"name": "Guzzini Glass Dinnerware (Service for 4)", "price": 79.99, "description": "Stylish and durable glass plates and bowls.", "image_url": "https://source.unsplash.com/800x600/?dinnerware,kitchen", "stock": 150, "category": "Home & Kitchen"},
        {"name": "ThermoPro Instant-Read Meat Thermometer", "price": 29.99, "description": "Fast and accurate temperature readings for cooking.", "image_url": "https://source.unsplash.com/800x600/?thermometer,kitchen", "stock": 180, "category": "Home & Kitchen"},

        # ---------------- SPORTS (20) ----------------
        {"name": "Wilson Evolution Indoor Basketball", "price": 64.95, "description": "Official-sized indoor ball with superior grip and feel.", "image_url": "https://source.unsplash.com/800x600/?basketball,sports", "stock": 140, "category": "Sports"},
        {"name": "Adidas Predator Pro Soccer Ball", "price": 39.99, "description": "Match-quality ball constructed for consistent flight.", "image_url": "https://source.unsplash.com/800x600/?soccer,ball,sports", "stock": 120, "category": "Sports"},
        {"name": "Peloton Bike (Basic)", "price": 1895.00, "description": "Connected exercise bike with immersive classes and metrics.", "image_url": "https://source.unsplash.com/800x600/?peloton,bike,sports", "stock": 8, "category": "Sports"},
        {"name": "Garmin Forerunner 265 GPS Watch", "price": 349.99, "description": "Advanced running watch with training features and maps.", "image_url": "https://source.unsplash.com/800x600/?garmin,watch,sports", "stock": 45, "category": "Sports"},
        {"name": "Bowflex SelectTech Adjustable Dumbbells (2.1-41 lbs)", "price": 329.00, "description": "Space-saving adjustable dumbbell set for home strength training.", "image_url": "https://source.unsplash.com/800x600/?dumbbells,fitness,sports", "stock": 40, "category": "Sports"},
        {"name": "Manduka PRO Yoga Mat", "price": 119.00, "description": "High-density mat for stability and joint protection.", "image_url": "https://source.unsplash.com/800x600/?yoga,mat,sports", "stock": 95, "category": "Sports"},
        {"name": "Specialized Road Bike Helmet", "price": 149.99, "description": "Aerodynamic, lightweight helmet for road cyclists.", "image_url": "https://source.unsplash.com/800x600/?bike,helmet,sports", "stock": 70, "category": "Sports"},
        {"name": "Titleist Pro V1 Golf Balls (12-Pack)", "price": 49.99, "description": "Tour-proven performance ball with excellent control and feel.", "image_url": "https://source.unsplash.com/800x600/?golf,balls,sports", "stock": 110, "category": "Sports"},
        {"name": "Wilson Tennis Racket (Pro Staff)", "price": 199.00, "description": "Precision racket for control and feel on court.", "image_url": "https://source.unsplash.com/800x600/?tennis,racket,sports", "stock": 55, "category": "Sports"},
        {"name": "Stiga Table Tennis Table (Foldable)", "price": 499.99, "description": "Indoor/outdoor table tennis table with easy storage.", "image_url": "https://source.unsplash.com/800x600/?tabletennis,sports", "stock": 12, "category": "Sports"},
        {"name": "Garmin Edge 530 Cycling Computer", "price": 249.99, "description": "Cycling GPS computer with performance insights.", "image_url": "https://source.unsplash.com/800x600/?cycling,computer,sports", "stock": 50, "category": "Sports"},
        {"name": "Spalding Outdoor Basketball", "price": 29.99, "description": "Durable ball built for outdoor courts and durability.", "image_url": "https://source.unsplash.com/800x600/?basketball,outdoor,sports", "stock": 200, "category": "Sports"},
        {"name": "Osprey Atmos AG 65 Backpack", "price": 279.00, "description": "Comfortable and ventilated pack for long hikes.", "image_url": "https://source.unsplash.com/800x600/?hiking,backpack,sports", "stock": 40, "category": "Sports"},
        {"name": "Suunto 9 Peak GPS Watch", "price": 499.00, "description": "Rugged multisport watch with long battery life.", "image_url": "https://source.unsplash.com/800x600/?suunto,watch,sports", "stock": 22, "category": "Sports"},
        {"name": "Wilson Badminton Racket Set (2)", "price": 59.99, "description": "Lightweight rackets ideal for recreational play.", "image_url": "https://source.unsplash.com/800x600/?badminton,sports", "stock": 90, "category": "Sports"},
        {"name": "Stadium Grade Soccer Goal (Portable)", "price": 219.99, "description": "Portable goal solution for practice and small games.", "image_url": "https://source.unsplash.com/800x600/?soccer,goal,sports", "stock": 30, "category": "Sports"},
        {"name": "Theragun PRO Percussion Massager", "price": 599.00, "description": "High-performance percussion device for muscle recovery.", "image_url": "https://source.unsplash.com/800x600/?massager,fitness,sports", "stock": 28, "category": "Sports"},
        {"name": "Kettlebell Cast Iron 16kg", "price": 49.99, "description": "Durable kettlebell for strength and conditioning.", "image_url": "https://source.unsplash.com/800x600/?kettlebell,fitness,sports", "stock": 160, "category": "Sports"},
        {"name": "Speedo Racing Swim Goggles", "price": 19.99, "description": "Low-profile goggles for competition and training.", "image_url": "https://source.unsplash.com/800x600/?swim,goggles,sports", "stock": 180, "category": "Sports"},

        # ---------------- BOOKS (20) ----------------
        {"name": "Atomic Habits by James Clear", "price": 16.20, "description": "Practical strategies for forming good habits and breaking bad ones.", "image_url": "https://source.unsplash.com/800x600/?atomic,habits,book", "stock": 200, "category": "Books"},
        {"name": "The Midnight Library by Matt Haig", "price": 13.99, "description": "A novel about regret, possibilities, and the lives we might have lived.", "image_url": "https://source.unsplash.com/800x600/?midnight,library,book", "stock": 120, "category": "Books"},
        {"name": "Dune by Frank Herbert (Paperback)", "price": 12.99, "description": "Classic science fiction epic of politics and spice on Arrakis.", "image_url": "https://source.unsplash.com/800x600/?dune,book", "stock": 140, "category": "Books"},
        {"name": "Project Hail Mary by Andy Weir", "price": 17.99, "description": "Sci-fi survival story with a lone astronaut and brilliant problem solving.", "image_url": "https://source.unsplash.com/800x600/?project,hail,mary,book", "stock": 110, "category": "Books"},
        {"name": "Educated by Tara Westover", "price": 14.95, "description": "Memoir about a woman who leaves her survivalist family to pursue education.", "image_url": "https://source.unsplash.com/800x600/?educated,book", "stock": 160, "category": "Books"},
        {"name": "The Pragmatic Programmer (20th Anniversary Edition)", "price": 42.99, "description": "Practical software development advice for modern programmers.", "image_url": "https://source.unsplash.com/800x600/?pragmatic,programmer,book", "stock": 95, "category": "Books"},
        {"name": "Clean Code by Robert C. Martin", "price": 34.99, "description": "Guidance on writing readable, maintainable code.", "image_url": "https://source.unsplash.com/800x600/?clean,code,book", "stock": 110, "category": "Books"},
        {"name": "Becoming by Michelle Obama", "price": 18.99, "description": "Memoir by the former First Lady exploring her life and values.", "image_url": "https://source.unsplash.com/800x600/?becoming,michelle,obama,book", "stock": 130, "category": "Books"},
        {"name": "Where the Crawdads Sing by Delia Owens", "price": 14.99, "description": "A coming-of-age murder mystery set in the marshes.", "image_url": "https://source.unsplash.com/800x600/?crawdads,book", "stock": 140, "category": "Books"},
        {"name": "The Vanishing Half by Brit Bennett", "price": 16.99, "description": "A multi-generational novel about identity and family.", "image_url": "https://source.unsplash.com/800x600/?vanishing,half,book", "stock": 125, "category": "Books"},
        {"name": "Sapiens by Yuval Noah Harari", "price": 19.99, "description": "A brief history of humankind and how cultures evolved.", "image_url": "https://source.unsplash.com/800x600/?sapiens,book", "stock": 150, "category": "Books"},
        {"name": "The Alchemist by Paulo Coelho", "price": 11.99, "description": "A fable about following your dreams and listening to your heart.", "image_url": "https://source.unsplash.com/800x600/?alchemist,book", "stock": 200, "category": "Books"},
        {"name": "Norwegian Wood by Haruki Murakami", "price": 13.99, "description": "A poignant coming-of-age story with themes of love and loss.", "image_url": "https://source.unsplash.com/800x600/?norwegian,wood,book", "stock": 95, "category": "Books"},
        {"name": "Thinking, Fast and Slow by Daniel Kahneman", "price": 14.99, "description": "A deep dive into the two systems that drive the way we think.", "image_url": "https://source.unsplash.com/800x600/?thinking,fast,slow,book", "stock": 115, "category": "Books"},
        {"name": "The Four Agreements by Don Miguel Ruiz", "price": 9.99, "description": "A practical guide to personal freedom and transformation.", "image_url": "https://source.unsplash.com/800x600/?four,agreements,book", "stock": 170, "category": "Books"},
        {"name": "The Subtle Art of Not Giving a F*ck by Mark Manson", "price": 14.99, "description": "Straightforward advice on living a better life by focusing on what matters.", "image_url": "https://source.unsplash.com/800x600/?subtle,art,book", "stock": 130, "category": "Books"},
        {"name": "How to Win Friends & Influence People by Dale Carnegie", "price": 10.99, "description": "Timeless tips for better relationships and leadership.", "image_url": "https://source.unsplash.com/800x600/?how,to,win,friends,book", "stock": 160, "category": "Books"},
        {"name": "Meditations by Marcus Aurelius (Translated)", "price": 8.99, "description": "Stoic philosophy classic for reflection and discipline.", "image_url": "https://source.unsplash.com/800x600/?meditations,book", "stock": 140, "category": "Books"}
    ]

    products = []

    for product_data in products_data:
        product = Product(
            name=product_data["name"],
            price=product_data["price"],
            description=product_data["description"],
            image_url=product_data["image_url"],
            stock=product_data["stock"],
            category=product_data["category"]
        )
        products.append(product)
        db.session.add(product)
    db.session.commit()

    # Now, the 'products' list contains all the created Product objects

    print("Creating orders and order items...")
    for user in users:
        num_orders = random.randint(0, 3)
        for _ in range(num_orders):
            order = Order(
                user_id=user.id,
                status=random.choice(['Pending', 'Processing', 'Shipped', 'Delivered']),
                total_amount=0.0
            )
            db.session.add(order)
            db.session.commit() # Commit to get order.id

            num_items = random.randint(1, 5)
            order_total = 0.0
            for _ in range(num_items):
                product = random.choice(products)
                quantity = random.randint(1, 3)
                order_item = OrderItem(
                    order_id=order.id,
                    product_id=product.id,
                    quantity=quantity,
                    price=product.price
                )
                db.session.add(order_item)
                order_total += (quantity * product.price)
            order.total_amount = order_total
            db.session.commit()

    print("Database seeded!")
