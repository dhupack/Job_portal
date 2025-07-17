
export const ErrorMessages = {
	// Authentication Errors
	INVALID_CREDENTIALS: 'Invalid credentials',
	NO_TOKEN_PROVIDED: 'No token provided',
	INVALID_TOKEN: 'Invalid token',
	UNAUTHORIZED: 'Unauthorized access',
	SUPERADMIN_REQUIRED: 'Superadmin access required',
	ADMIN_REQUIRED: 'Admin access required',
	USER_REQUIRED: 'User access required',
	ACCESS_DENIED: 'invalid denied',
	INVALID_PASSWORD: 'Invalid password',
  
	// Validation Errors
	VALIDATION_ERROR: 'Validation error',
	INVALID_EMAIL: 'Invalid email format',
	PASSWORD_TOO_SHORT: 'Password must be at least 6 characters',
	NAME_TOO_SHORT: 'Name must be at least 2 characters',
	INVALID_JOB_ID: 'Invalid job ID',
	INVALID_RESUME_ID: 'Invalid resume ID',
	INVALID_APPLICATION_ID: 'Invalid application ID',
	INVALID_USER_ID: 'Invalid user ID',
	INVALID_ADMIN_ID: 'Invalid admin ID',
	TITLE_TOO_SHORT: 'Job title must be at least 3 characters',
	DESCRIPTION_TOO_SHORT: 'Job description must be at least 10 characters',
	COMPANY_TOO_SHORT: 'Company name must be at least 2 characters',
	LOCATION_TOO_SHORT: 'Location must be at least 2 characters',
	INVALID_DATE_FORMAT: 'Invalid date format',
	INTERVIEWER_TOO_SHORT: 'Interviewer name must be at least 2 characters',
	START_DATE_REQUIRED: 'Start date is required',
	END_DATE_REQUIRED: 'End date is required',
	INVALID_DATE_RANGE: 'End date must be after start date',
	INTERVIEW_SCHEDULED: 'Interview scheduled successfully',
  
	// Resource Errors
	USER_NOT_FOUND: 'User not found',
	ADMIN_NOT_FOUND: 'Admin not found',
	JOB_NOT_FOUND: 'Job not found',
	RESUME_NOT_FOUND: 'Resume not found',
	APPLICATION_NOT_FOUND: 'Application not found',
	USER_ALREADY_EXISTS: 'User already exists',
	ADMIN_ALREADY_EXISTS: 'Admin already exists',
	JOB_CREATED: 'Job created successfully',
	ADMIN_DELETED: 'Admin deleted successfully',
	JOB_DELETED: 'Job deleted successfully',
	USER_DELETED: 'User deleted successfully',
	QUEUE_CONSUME_ERROR: "Error consuming from queue",
  
	// Service Errors
	MONGO_CONNECTION_FAILED: 'Failed to connect to MongoDB',
	RABBITMQ_CONNECTION_FAILED: 'Failed to connect to RabbitMQ',
	REDIS_CONNECTION_FAILED: 'Failed to connect to Redis',
	CACHE_GET_ERROR: 'Error retrieving cache',
	CACHE_SET_ERROR: 'Error setting cache',
	QUEUE_SEND_ERROR: 'Error sending message to queue',
	NOTIFICATION_ERROR: 'Error sending notification',
  
	// File Upload Errors
	NO_FILE_UPLOADED: 'No file uploaded',
	INVALID_FILE_TYPE: 'Invalid file type. Only PDF files are allowed',
	FILE_TOO_LARGE: 'File size exceeds the maximum limit',
	INVALID_RESUME: 'Invalid resume',
  
	// General Errors
	BAD_REQUEST: 'Bad request',
	INTERNAL_SERVER_ERROR: 'Internal server error',
	RESOURCE_ALREADY_EXISTS: 'Resource already exists',
	FORBIDDEN: 'Forbidden action',
	SERVER_ERROR: 'SERVER ERROR',
	APPLICATION_SUBMITTED: 'application submitted'
	
  } as const;
  