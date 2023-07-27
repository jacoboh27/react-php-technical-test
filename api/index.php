<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $sql = "SELECT * FROM users";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $users = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($users);
        break;

    case "POST":
        $user = json_decode( file_get_contents('php://input') );
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[3]) && $path[3] === "save") {          
            $email = $user->email;
            $sqlVerifyMail = "SELECT * FROM users WHERE email = '$email'";
            $stmt = $conn->prepare($sqlVerifyMail);
            $stmt->execute();
            $emailValidation = $stmt->fetch(PDO::FETCH_ASSOC);
            if($emailValidation) {
                $response = ['status' => 2, 'message' => 'The email is already associated with an account.'];
            } else {
                $secure_password = password_hash($user->password, PASSWORD_DEFAULT);
                $sql = "INSERT INTO users(id, name, last_name, email, password, created_at) VALUES(null, :name, :last_name, :email, :password, :created_at)";
                $stmt = $conn->prepare($sql);
                $created_at = date('Y-m-d');
                $stmt->bindParam(':name', $user->name);
                $stmt->bindParam(':last_name', $user->lastName);
                $stmt->bindParam(':email', $user->email);
                $stmt->bindParam(':password', $secure_password);
                $stmt->bindParam(':created_at', $created_at);
        
                if($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Record created successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to create record.'];
                }        
            }
            
        } else if (isset($path[3]) && $path[3] === "validate") {
            $email = $user->email;
            $password = $user->password;

            $sql = "SELECT password FROM users WHERE email = '$email'";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if($user) {
                if (password_verify($password, $user['password'])) {
                    $response = ['status' => 1, 'message' => 'Login successful.'];
                } else {
                    $response = ['status' => 2, 'message' => 'Invalid password.'];
                }
            } else {
                $response = ['status' => 0, 'message' => 'Invalid email.'];
            }
        }
        echo json_encode($response);
        break;

    case "PUT":
        $user = json_decode( file_get_contents('php://input') );
        $sql = "UPDATE users SET name=:name, last_name=:last_name, email =:email, phone_number=:phone_number, address=:address WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $user->id);
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':last_name', $user->lastName);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':phone_number', $user->phoneNumber);
        $stmt->bindParam(':address', $user->address);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM users WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[3]);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;
}