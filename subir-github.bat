@echo off
echo ========================================
echo Subiendo proyecto a GitHub
echo ========================================
echo.

REM Verificar si git está instalado
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git no está instalado.
    echo Por favor instala Git desde: https://git-scm.com/
    pause
    exit /b 1
)

echo 1. Inicializando repositorio Git...
if not exist .git (
    git init
)

echo.
echo 2. Agregando archivos...
git add .

echo.
echo 3. Verificando si hay cambios...
git status

echo.
echo 4. Configurando remote...
git remote remove origin 2>nul
git remote add origin https://github.com/Kazuke23/front_calculadora.git

echo.
echo 5. Haciendo commit inicial...
git commit -m "Initial commit: Calculadora React con TypeScript - Migración completa a TS"

echo.
echo 6. Subiendo a GitHub...
echo NOTA: Si es la primera vez, te pedirá credenciales de GitHub
git branch -M main
git push -u origin main

echo.
echo ========================================
echo ¡Proyecto subido exitosamente!
echo ========================================
pause

