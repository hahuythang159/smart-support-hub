# Bước 1: Chọn image gốc cho Node.js
FROM node:16-alpine AS build

# Bước 2: Cài đặt thư mục làm việc trong container
WORKDIR /app

# Bước 3: Sao chép package.json và package-lock.json
COPY package.json package-lock.json ./

# Bước 4: Cài đặt tất cả dependencies
RUN npm install

# Bước 5: Sao chép mã nguồn
COPY . .

# Bước 6: Biên dịch TypeScript
RUN npm run build

# Bước 7: Tạo image nhẹ hơn để chạy ứng dụng
FROM node:16-alpine

# Bước 8: Cài đặt thư mục làm việc trong container
WORKDIR /app

# Bước 9: Sao chép các file đã build vào container
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules

# Bước 10: Cấu hình port
EXPOSE 8080

# Bước 11: Chạy ứng dụng
CMD ["node", "dist/index.js"]
