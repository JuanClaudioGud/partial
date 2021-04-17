export const TIMEZONE: string = 'UTC';

export const TOKEN_NAME: string = 'jwt_token';

export const SNACK_BAR_DEFAULT_DISMISS_TEXT: string = 'Cerrar';

export const DEFAULT_ERROR_MSG: string  = 'Ha ocurrido un error inesperado, intentalo nuevamente más tarde.';

export const INVALID_CREDENTIALS_MSG: string = 'Credenciales de acceso incorrectas';

export const SERVICE_UNAVAILABLE_MSG: string = 'El servicio se encuentra temporalmente suspendido.';

export const RESERVATION_NOT_FOUND_MSG: string = 'No hay turnos asociados al e-mail ingresado.';

export const NOTIFICATION_UPDATE_SUCCESS_MSG: string = 'La notificación se ha actualizado correctamente!';

export const NOTIFICATION_DELETE_SUCCESS_MSG: string = 'Las notificaciones se han eliminado correctamente!';

export const APPOINTMENT_CREATE_SUCCESS_MSG: string = 'El turno se ha agendado correctamente!';

export const APPOINTMENT_UPDATE_SUCCESS_MSG: string = 'El turno se ha actualizado correctamente!';

export const APPOINTMENT_DELETE_SUCCESS_MSG: string = 'Los turnos se han eliminado correctamente!';

export const APPOINTMENT_CANCEL_SUCCESS_MSG: string = 'El turno se ha cancelado correctamente!';

export const TREATMENT_CREATE_SUCCESS_MSG: string = 'El tratamiento se ha agregado correctamente!';

export const TREATMENT_UPDATE_SUCCESS_MSG: string = 'El tratamiento se ha actualizado correctamente!';

export const TREATMENT_DELETE_SUCCESS_MSG: string = 'Los tratamientos se han eliminado correctamente!';

export const TREATMENT_CATEGORY_CREATE_SUCCESS_MSG: string = 'La categoría se ha agregado correctamente!';

export const TREATMENT_CATEGORY_UPDATE_SUCCESS_MSG: string = 'La categoría se ha actualizado correctamente!';

export const TREATMENT_CATEGORY_DELETE_SUCCESS_MSG: string = 'Las categorias se han eliminado correctamente!';

export const UNAVAILABILITY_CREATE_SUCCESS_MSG: string = 'La indisponibilidad se ha agregado correctamente!';

export const UNAVAILABILITY_UPDATE_SUCCESS_MSG: string = 'La indisponibilidad se ha actualizado correctamente!';

export const UNAVAILABILITY_DELETE_SUCCESS_MSG: string = 'Las indisponibilidades se han eliminado correctamente!';

export const BREAK_TIME_CREATE_SUCCESS_MSG: string = 'El horario de descanso se ha agregado correctamente!';

export const BREAK_TIME_UPDATE_SUCCESS_MSG: string = 'El horario de descanso se ha actualizado correctamente!';

export const BREAK_TIME_DELETE_SUCCESS_MSG: string = 'Los horarios de descanso se han eliminado correctamente!';

export const WORKING_DAY_UPDATE_SUCCESS_MSG: string = 'El día laboral se ha actualizado correctamente!';

export const enum HttpStatusCode {
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  MULTI_STATUS = 207,
  ALREADY_REPORTED = 208,
  IM_USED = 226,
  MULTIPLE_CHOICES = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  USE_PROXY = 305,
  SWITCH_PROXY = 306,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  PAYLOAD_TOO_LARGE = 413,
  URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  I_AM_A_TEAPOT = 418,
  MISDIRECTED_REQUEST = 421,
  UNPROCESSABLE_ENTITY = 422,
  LOCKED = 423,
  FAILED_DEPENDENCY = 424,
  UPGRADE_REQUIRED = 426,
  PRECONDITION_REQUIRED = 428,
  TOO_MANY_REQUESTS = 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
  UNAVAILABLE_FOR_LEGAL_REASONS = 451,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,
  VARIANT_ALSO_NEGOTIATES = 506,
  INSUFFICIENT_STORAGE = 507,
  LOOP_DETECTED = 508,
  NOT_EXTENDED = 510,
  NETWORK_AUTHENTICATION_REQUIRED = 511,
}