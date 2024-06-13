import path from "path";
import { fileURLToPath } from "url";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import WorkboxWebpackPlugin from "workbox-webpack-plugin";

import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = "style-loader";

const config = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      favicon: path.join(__dirname, "src/assets/images/favicon.ico"),
    }),
    new webpack.DefinePlugin({
      "process.env.AUTH_TOKEN": JSON.stringify(process.env.AUTH_TOKEN),
      "process.env.SWAPI_URI": JSON.stringify(process.env.SWAPI_URI),
      "process.env.UNSPLASH_URI": JSON.stringify(process.env.UNSPLASH_URI),
      "process.env.BREWERY_URI": JSON.stringify(process.env.BREWERY_URI),
    }),
  ],
  target: "web",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|ico)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".scss", "..."],
    alias: {
      "@app": path.resolve(__dirname, "src"),
      "@context": path.resolve(__dirname, "src/context"),
      "@data": path.resolve(__dirname, "src/data"),
      "@api": path.resolve(__dirname, "src/api"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@components": path.resolve(__dirname, "src/components"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
};

if (!isProduction) {
  config.devServer = {
    host: "0.0.0.0",
    port: process.env.PORT,
    open: true,
    hot: true,
    historyApiFallback: true,
  };
}

export default () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = "development";
  }
  return config;
};
