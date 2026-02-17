import { describe, it, expect, mock, beforeEach } from "bun:test";
import * as service from "../src/routes/tasks/service";

// Mocks
const mockGetTasksListDB = mock();
const mockGetTaskByIdDB = mock();
const mockCreateTaskDB = mock();
const mockUpdateTaskDB = mock();
const mockDeleteTaskDB = mock();

// Mock the repository module
mock.module("../src/routes/tasks/repository", () => {
	return {
		getTasksListDB: mockGetTasksListDB,
		getTaskByIdDB: mockGetTaskByIdDB,
		createTaskDB: mockCreateTaskDB,
		updateTaskDB: mockUpdateTaskDB,
		deleteTaskDB: mockDeleteTaskDB,
	};
});

describe("Tasks Service", () => {
	beforeEach(() => {
		// Clearing mocks before each test
		mockGetTasksListDB.mockClear();
		mockGetTaskByIdDB.mockClear();
		mockCreateTaskDB.mockClear();
		mockUpdateTaskDB.mockClear();
		mockDeleteTaskDB.mockClear();
	});

	describe("getTasksList", () => {
		it("should return a list of tasks with correct fields", async () => {
			const mockDate = new Date();
			const dbTasks = [
				{
					id: 1,
					title: "Test Task 1",
					description: "Desc 1",
					status: "complete",
					dueDate: mockDate,
					randomField: "should be ignored",
				},
				{
					id: 2,
					title: "Test Task 2",
					description: "Desc 2",
					status: "in_progress",
					dueDate: mockDate,
				},
			];

			mockGetTasksListDB.mockResolvedValue(dbTasks);

			const result = await service.getTasksList();

			expect(mockGetTasksListDB).toHaveBeenCalled();
			expect(result).toHaveLength(2);
			expect(result[0]).toEqual({
				id: 1,
				title: "Test Task 1",
				description: "Desc 1",
				status: "complete",
				dueDate: mockDate,
			});
			expect(result[0]).not.toHaveProperty("randomField");
		});

		it("should return an empty list when no tasks exist", async () => {
			mockGetTasksListDB.mockResolvedValue([]);
			const result = await service.getTasksList();
			expect(result).toEqual([]);
		});
	});

	describe("getTask", () => {
		const taskIdDto = { id: 1 };
		const mockDate = new Date();

		it("should return a single task when found", async () => {
			const dbTask = [
				{
					id: 1,
					title: "Single Task",
					description: "Single Desc",
					status: "pending",
					dueDate: mockDate,
				},
			];

			mockGetTaskByIdDB.mockResolvedValue(dbTask);

			const result = await service.getTask(taskIdDto);

			expect(mockGetTaskByIdDB).toHaveBeenCalledWith(taskIdDto.id);
			expect(result).toEqual({
				id: 1,
				title: "Single Task",
				description: "Single Desc",
				status: "pending",
				dueDate: mockDate,
			});
		});

		it("should return null when task is not found (empty array)", async () => {
			mockGetTaskByIdDB.mockResolvedValue([]);
			const result = await service.getTask(taskIdDto);
			expect(result).toBeNull();
		});

		it("should return null when task is not found (null)", async () => {
			mockGetTaskByIdDB.mockResolvedValue(null);
			const result = await service.getTask(taskIdDto);
			expect(result).toBeNull();
		});
	});

	describe("createTask", () => {
		const createTaskDto = {
			title: "New Task",
			description: "New Desc",
			status: "pending" as const, // matching enum type if needed
			dueDate: new Date(),
		};

		it("should create and return the new task", async () => {
			const dbCreatedTask = [
				{
					id: 1,
					...createTaskDto,
				},
			];

			mockCreateTaskDB.mockResolvedValue(dbCreatedTask);

			const result = await service.createTask(createTaskDto);

			expect(mockCreateTaskDB).toHaveBeenCalledWith(createTaskDto);
			expect(result).toEqual({
				id: 1,
				title: createTaskDto.title,
				description: createTaskDto.description,
				status: createTaskDto.status,
				dueDate: createTaskDto.dueDate,
			});
		});
	});

	describe("updateTask", () => {
		const taskIdDto = { id: 1 };
		const updateTaskDto = {
			title: "Updated Task",
			description: "Updated Desc",
			status: "pending" as const,
			dueDate: new Date(),
		};

		it("should update and return the task when found", async () => {
			const dbUpdatedTask = [
				{
					id: 1,
					...updateTaskDto,
				},
			];

			mockUpdateTaskDB.mockResolvedValue(dbUpdatedTask);

			const result = await service.updateTask(taskIdDto, updateTaskDto);

			expect(mockUpdateTaskDB).toHaveBeenCalledWith(
				taskIdDto.id,
				updateTaskDto,
			);
			expect(result).toEqual({
				id: 1,
				title: updateTaskDto.title,
				description: updateTaskDto.description,
				status: updateTaskDto.status,
				dueDate: updateTaskDto.dueDate,
			});
		});

		it("should return null when task to update is not found", async () => {
			mockUpdateTaskDB.mockResolvedValue([]);
			const result = await service.updateTask(taskIdDto, updateTaskDto);
			expect(result).toBeNull();
		});
	});

	describe("deleteTask", () => {
		const taskIdDto = { id: 1 };

		it("should return task id when deletion is successful", async () => {
			mockDeleteTaskDB.mockResolvedValue({ rowCount: 1 });

			const result = await service.deleteTask(taskIdDto);

			expect(mockDeleteTaskDB).toHaveBeenCalledWith(taskIdDto.id);
			expect(result).toEqual({ id: 1 });
		});

		it("should return null when task to delete is not found", async () => {
			mockDeleteTaskDB.mockResolvedValue({ rowCount: 0 });

			const result = await service.deleteTask(taskIdDto);

			expect(result).toBeNull();
		});

		it("should return null when result is null", async () => {
			mockDeleteTaskDB.mockResolvedValue(null);
			const result = await service.deleteTask(taskIdDto);
			expect(result).toBeNull();
		});
	});
});
