export function createEmployeeData() {
  const id = Date.now();

  return {
    firstName: "Test",
    lastName: `Employee${id}`,
  };
}
