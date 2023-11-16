const { TEMPLATES_FOLDER_PATH: basePath, TEMPLATES_ENGINE: engine } =
  process.env;

const config = {
  folder: basePath,
  engine: engine,
};

export default Object.freeze({ ...config });
