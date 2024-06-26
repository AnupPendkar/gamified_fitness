#! Function to read the your local ip address
define get_ip
	$(shell hostname -I | cut -d' ' -f1)
endef

include .env

kill_PORT:
	@PID=$$(netstat -plten | awk '/172.16.120.62/ && /\/next-server/ {print $$9}' | cut -d'/' -f1); \
	if [ ! -z "$$PID" ]; then \
		kill -9 $$PID; \
		echo "Killing process $$PID"; \
	else \
		echo "No process found"; \
	fi


generate_build_no := \
		current_build_no=$$(grep -oP 'export const APP_BUILD_NO = \K\d+' src/app/utils/build_no.ts); \
		new_build_no=$$((current_build_no + 1)); \
		sed -i "s/export const APP_BUILD_NO = $$current_build_no;/export const APP_BUILD_NO = $$new_build_no;/" src/app/utils/build_no.ts; \
		git add .; \

#! Variables
NODE_VERSION=18
NEXT_VERSION=14.2.3


# Targets
.PHONY: ip run build rmn i test lint dc-up dc-down kill_PORTS

#! System Commands
ip:
	@echo $(call get_ip)

#! Next.js Commands
run-dev:
	@npm run dev -- -H $(SERVER_HOST_IP) -p $(SERVER_PORT)

build:
	@npm run build

run-prod:
	@npm run start -- -H $(SERVER_HOST_IP) -p $(SERVER_PORT)

#! Docker Cli Commands
dc-up:
	sudo docker-compose up --remove-orphans

dc-down:
	sudo docker-compose down

dc-remove-all:
	sudo docker system prune -a

#! Drizzle
run-migrations:
	@npx drizzle-kit generate:pg

migrate:
	@npx tsx ./lib/migrate.ts

db-view:
	@npx drizzle-kit studio --port 9005



#! Default target
.DEFAULT_GOAL := serve
