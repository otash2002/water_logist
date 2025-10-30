import winston from 'winston';
import path from 'path';

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

const NODE_ENV = process.env.NODE_ENV || 'development';
const LOG_DIR = process.env.LOG_DIR || path.join(process.cwd(), 'logs');

// Human-friendly format for console in development
const devFormat = combine(
	colorize({ all: true }),
	timestamp(),
	errors({ stack: true }),
	printf(({ level, message, timestamp, stack, ...meta }) => {
		const base = `${timestamp} [${level}]: ${message}`;
		const extra = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
		return stack ? `${base}\n${stack}${extra}` : `${base}${extra}`;
	})
);

// Structured JSON format for production
const prodFormat = combine(timestamp(), errors({ stack: true }), json());

const logger = winston.createLogger({
	level: NODE_ENV === 'development' ? 'debug' : 'info',
	format: NODE_ENV === 'development' ? devFormat : prodFormat,
	defaultMeta: { service: 'water-logist' },
	transports: [
		// Info and above go to combined.log
		new winston.transports.File({ filename: path.join(LOG_DIR, 'combined.log'), level: 'info', handleExceptions: true }),
		// Errors go to error.log
		new winston.transports.File({ filename: path.join(LOG_DIR, 'error.log'), level: 'error', handleExceptions: true })
	],
	exitOnError: false
});

// In development also log to the console
if (NODE_ENV === 'development') {
	logger.add(new winston.transports.Console({ format: devFormat, handleExceptions: true }));
}

// Stream object for morgan integration: morgan will call stream.write
const stream = {
	write: (message) => {
		// morgan adds a newline at the end of the message
		logger.info(message.trim());
	}
};

// Helper to create child loggers with additional context
const child = (meta) => logger.child(meta);

export default logger;
export { stream, child };

