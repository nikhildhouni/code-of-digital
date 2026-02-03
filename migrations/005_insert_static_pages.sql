-- Insert static pages into the pages table so they appear in SEO Manager

insert into pages (slug, title, status) values 
('home', 'Home Page', 'published'),
('about', 'About Us', 'published'),
('services', 'Services', 'published'),
('pricing', 'Pricing', 'published'),
('portfolio', 'Portfolio', 'published'),
('contact', 'Contact Us', 'published'),
('blog', 'Blog Listing', 'published')
on conflict (slug) do nothing;
