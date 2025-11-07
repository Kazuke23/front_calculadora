# 📤 Instrucciones para Subir el Proyecto a GitHub

## Prerrequisitos

1. **Instalar Git** (si no lo tienes):
   - Descarga desde: https://git-scm.com/download/win
   - Instala con las opciones por defecto
   - Reinicia tu terminal después de instalar

2. **Configurar Git** (primera vez):
   ```bash
   git config --global user.name "Tu Nombre"
   git config --global user.email "tu.email@ejemplo.com"
   ```

## Opción 1: Usar el Script Automático (Recomendado)

1. Ejecuta el archivo `subir-github.bat` haciendo doble clic
2. El script hará todo automáticamente

## Opción 2: Comandos Manuales

Abre PowerShell o CMD en la carpeta del proyecto y ejecuta:

```bash
# 1. Inicializar repositorio (si no está inicializado)
git init

# 2. Agregar todos los archivos
git add .

# 3. Hacer commit
git commit -m "Initial commit: Calculadora React con TypeScript"

# 4. Agregar el remote de GitHub
git remote add origin https://github.com/Kazuke23/front_calculadora.git

# 5. Cambiar a rama main
git branch -M main

# 6. Subir al repositorio
git push -u origin main
```

## Si el Repositorio ya Existe en GitHub

Si el repositorio ya tiene contenido, usa:

```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

## Autenticación en GitHub

Si te pide credenciales:

1. **Token Personal** (Recomendado):
   - Ve a: https://github.com/settings/tokens
   - Genera un nuevo token con permisos `repo`
   - Úsalo como contraseña cuando Git lo pida

2. **GitHub CLI** (Alternativa):
   ```bash
   # Instalar GitHub CLI
   winget install GitHub.cli
   
   # Autenticarse
   gh auth login
   ```

## Verificar que se Subió Correctamente

Visita: https://github.com/Kazuke23/front_calculadora

## Comandos Útiles para el Futuro

```bash
# Ver estado de cambios
git status

# Agregar archivos modificados
git add .

# Hacer commit
git commit -m "Descripción de los cambios"

# Subir cambios
git push

# Ver historial
git log --oneline
```

## Solución de Problemas

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/Kazuke23/front_calculadora.git
```

### Error: "failed to push some refs"
```bash
git pull origin main --rebase
git push -u origin main
```

### Error: "authentication failed"
- Verifica que tu token de GitHub sea válido
- O usa GitHub Desktop como alternativa

