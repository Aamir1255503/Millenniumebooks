<?php
require __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

require __DIR__ . '/app/Database.php';

echo "Create Admin User\n";
echo "-----------------\n";

$name = readline("Enter name: ");
$email = readline("Enter email: ");
$password = readline("Enter password: ");

$db = Database::getInstance()->getConnection();

$stmt = $db->prepare("SELECT id FROM users WHERE email = ?");
$stmt->execute([$email]);
if ($stmt->fetch()) {
    echo "Error: User with this email already exists.\n";
    exit(1);
}

$passwordHash = password_hash($password, PASSWORD_DEFAULT);

$stmt = $db->prepare("INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, 'admin', 1)");
if ($stmt->execute([$name, $email, $passwordHash])) {
    echo "Admin user created successfully!\n";
} else {
    echo "Error creating admin user.\n";
}
