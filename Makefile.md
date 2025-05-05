### **Overview**

This documentation provides instructions for using the Makefile, which is a containerized API system built using Docker. The Makefile included in this project streamlines the development workflow by automating common tasks such as building, testing, linting, and cleaning Docker containers.

The service is currently configured to build and manage a single container: `api`. You can customize the list of containers by modifying the `CONTAINERS` variable in the Makefile.

### **Prerequisites**
Before using this service, ensure the following are installed and configured:
1. **Docker** (latest version)
2. **Make** (command-line build tool)
3. **curl** (for API testing)


2. **Verify the Makefile Configuration**:
 The `CONTAINERS` variable is set to `api` by default. If you have additional containers, update this line in the Makefile:
 ```makefile
 CONTAINERS ?= api
 ```

3. **Build the Service**:
 Run the following command to build all containers:
 ```bash
 make all
 ```
 This executes:
 - `build`: Builds Docker images for all containers.
 - `test`: Runs tests for all containers.
 - `lint`: Lints code for all containers.

### **Usage**
#### **1. Build Containers**
```bash
make build
```
This builds Docker images for all specified containers using their respective `Dockerfile` files.

#### **2. Run Tests**
```bash
make test
```
This builds and runs tests for all containers using the `Dockerfile.test` files.

#### **3. Lint Code**
```bash
make lint
```
This builds and runs linters for all containers using the `Dockerfile.lint` files.

#### **4. Clean Up**
```bash
make clean
```
This removes Docker images associated with the containers to free up space.

#### **5. Debug Mode**
```bash
make debug
```
This starts the `api` container in interactive mode, mapping port `5000` for API testing.

#### **6. API Calls**
Use `curl` to interact with the API:
```bash
make call
```
Example request:
```bash
curl http://localhost:5000/api/generate \
-d '{"model": "qwen2.5", "prompt": "what time is it?"}' \
-H "Content-Type: application/json"
```

```bash
make call2
```
Example request:
```bash
curl http://localhost:5000/api/generate \
-d '{"model": "qwen2.5", "prompt": "what is the day today?"}' \
-H "Content-Type: application/json"
```

### **Customization**
- **Add New Containers**:
Update the `CONTAINERS` variable in the Makefile to include additional services (e.g., `CONTAINERS ?= api db`).
- **Modify Dockerfiles**:
Adjust `Dockerfile`, `Dockerfile.test`, and `Dockerfile.lint` files to customize the build, test, and linting processes.

### **Troubleshooting**
- **Image Removal Errors**:
The `clean` target uses `docker rmi -f` to force remove images. If errors occur, ensure no containers are running.
- **Port Conflicts**:
If port `5000` is occupied, stop the container with `docker stop local-api` before running `make debug`.

### **Conclusion**
This Makefile provides a streamlined workflow for managing the Mkefiel service, enabling efficient development, testing, and deployment of containerized APIs. Customize the configuration to suit your project needs, and leverage the provided commands to maintain a clean and organized development environment.service, which is a containerized API system built using Docker. The Makefile included in this project streamlines the development workflow by automating common tasks such as building, testing, linting, and cleaning Docker containers.

The service is currently configured to build and manage a single container: `api`. You can customize the list of containers by modifying the `CONTAINERS` variable in the Makefile.
