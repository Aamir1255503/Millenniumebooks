USE millenniumebooks;

-- Categories
INSERT INTO categories (name, slug, description) VALUES 
('Business & Finance', 'business-finance', 'Books on business, finance, and entrepreneurship.'),
('Health & Wellness', 'health-wellness', 'Guides for a healthier lifestyle and mindfulness.'),
('Technology', 'technology', 'Latest trends in tech, programming, and software.'),
('Self-Help', 'self-help', 'Personal development and self-improvement guides.');

-- Packages
INSERT INTO packages (name, slug, price, description, word_limit, revisions, formats, delivery_days, fast_delivery_days, fast_delivery_extra, features, is_popular, sort_order) VALUES 
('Starter', 'starter', 500.00, 'Perfect for lead magnets and short guides.', 10000, 2, 'PDF', 14, 7, 150.00, '["Original Writing","Professional Formatting","Standard Cover Design"]', 0, 1),
('Professional', 'professional', 900.00, 'Ideal for comprehensive guides and e-books.', 25000, 3, 'PDF, EPUB', 30, 14, 250.00, '["Original Writing","Professional Formatting","Premium Cover Design","Stock Images Included"]', 1, 2),
('Premium', 'premium', 1500.00, 'Full-length books and deep dives.', 50000, -1, 'PDF, EPUB, DOCX', 60, 30, 500.00, '["Original Writing","Professional Formatting","Custom Cover Design","Extensive Research","Unlimited Revisions"]', 0, 3);

-- Authors (Sample)
INSERT INTO authors (name, slug, bio) VALUES 
('Jane Doe', 'jane-doe', 'Expert in business and finance.'),
('John Smith', 'john-smith', 'Health and wellness coach.');

-- Books (8 Sample Books, priced $100-$300)
INSERT INTO books (author_id, title, slug, short_description, description, price, cover_image, file_path, file_type, pages, published_at) VALUES 
(1, 'The Startup Playbook', 'startup-playbook', 'A complete guide to launching your first business.', 'In-depth guide covering all aspects of starting a business from scratch, funding, and marketing.', 150.00, 'assets/covers/startup.jpg', 'storage/books/startup-playbook.pdf', 'PDF', 120, '2023-01-15'),
(1, 'Financial Freedom 101', 'financial-freedom-101', 'Master your personal finances.', 'Learn how to budget, save, and invest for a secure future.', 120.00, 'assets/covers/finance.jpg', 'storage/books/financial-freedom.pdf', 'PDF', 95, '2023-02-20'),
(2, 'Mindful Living', 'mindful-living', 'Daily practices for peace of mind.', 'Explore mindfulness techniques to reduce stress and improve focus.', 100.00, 'assets/covers/mindful.jpg', 'storage/books/mindful-living.pdf', 'PDF', 80, '2023-03-10'),
(2, 'Healthy Habits', 'healthy-habits', 'Build habits that last a lifetime.', 'A practical approach to nutrition, exercise, and mental well-being.', 130.00, 'assets/covers/healthy.jpg', 'storage/books/healthy-habits.epub', 'EPUB', 110, '2023-04-05'),
(1, 'Tech Trends 2024', 'tech-trends-2024', 'Stay ahead in the digital world.', 'An analysis of upcoming technologies including AI, Web3, and more.', 200.00, 'assets/covers/tech.jpg', 'storage/books/tech-trends.pdf', 'PDF', 150, '2023-05-12'),
(1, 'Coding for Beginners', 'coding-beginners', 'Start your programming journey.', 'Learn the basics of HTML, CSS, and JavaScript with practical examples.', 180.00, 'assets/covers/coding.jpg', 'storage/books/coding-beginners.pdf', 'PDF', 200, '2023-06-18'),
(2, 'Productivity Hacks', 'productivity-hacks', 'Get more done in less time.', 'Actionable tips and systems to boost your daily productivity.', 110.00, 'assets/covers/productivity.jpg', 'storage/books/productivity.epub', 'EPUB', 85, '2023-07-22'),
(1, 'Marketing Mastery', 'marketing-mastery', 'Grow your audience and sales.', 'Advanced strategies for digital marketing, SEO, and social media.', 250.00, 'assets/covers/marketing.jpg', 'storage/books/marketing.pdf', 'PDF', 220, '2023-08-30');

-- Book Categories
INSERT INTO book_categories (book_id, category_id) VALUES 
(1, 1), (2, 1), (3, 2), (4, 2), (5, 3), (6, 3), (7, 4), (8, 1);

-- Portfolio Items (Placeholders)
INSERT INTO portfolio_items (title, slug, genre, client_type, description, permission_confirmed) VALUES 
('Custom Real Estate Guide', 'custom-real-estate-guide', 'Business', 'Corporate', 'A 50-page comprehensive guide for first-time homebuyers.', 1),
('Fitness Coaching E-book', 'fitness-coaching-ebook', 'Health', 'Individual Coach', 'A 30-day workout and meal plan e-book.', 1),
('SaaS Onboarding Manual', 'saas-onboarding-manual', 'Technology', 'Startup', 'Detailed onboarding documentation converted into an engaging e-book.', 1);
