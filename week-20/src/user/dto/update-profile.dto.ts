// TODO: Implement UpdateProfileDto with class-validator decorators
// Should validate name and/or password (both optional)

export class UpdateProfileDto {
  // Add properties and validation decorators here
  name?: string;
  password?: string;
}
