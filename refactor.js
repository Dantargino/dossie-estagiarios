const fs = require('fs');

function processFile(path, replacerFn) {
    let content = fs.readFileSync(path, 'utf8');
    content = replacerFn(content);
    fs.writeFileSync(path, content, 'utf8');
}

// 1. dashboard_principal.html
processFile('c:\\git\\pessoal\\dossie-ai\\dashboard_principal.html', content => {
    return content
        .replace('<html lang="en">', '<html lang="pt-br">')
        .replace('<a class="flex items-center gap-3 px-4 py-2.5 sidebar-active rounded-lg font-medium text-sm transition-all" href="#">', '<a class="flex items-center gap-3 px-4 py-2.5 sidebar-active rounded-lg font-medium text-sm transition-all" href="dashboard_principal.html">')
        .replace('<a class="flex items-center gap-3 px-4 py-2.5 text-brand-gray hover:bg-slate-50 hover:text-brand-primary rounded-lg font-medium text-sm transition-all" href="#">\n<svg class="w-5 h-5" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path d="M12 4.354', '<a class="flex items-center gap-3 px-4 py-2.5 text-brand-gray hover:bg-slate-50 hover:text-brand-primary rounded-lg font-medium text-sm transition-all" href="listagem_estagiarios.html">\n<svg class="w-5 h-5" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path d="M12 4.354')
        .replace('<a class="flex items-center gap-3 px-4 py-2.5 text-brand-gray hover:bg-slate-50 hover:text-brand-primary rounded-lg font-medium text-sm transition-all" href="#">\n<svg class="w-5 h-5" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path d="M9 19v-6a2', '<a class="flex items-center gap-3 px-4 py-2.5 text-brand-gray hover:bg-slate-50 hover:text-brand-primary rounded-lg font-medium text-sm transition-all" href="analise_ia_exportacao.html">\n<svg class="w-5 h-5" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path d="M9 19v-6a2')
        .replace('<a class="flex items-center gap-3 px-4 py-2.5 text-brand-gray hover:bg-slate-50 hover:text-brand-primary rounded-lg font-medium text-sm transition-all" href="#">\n<svg class="w-5 h-5" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path d="M9 17v-2m3', '<a class="flex items-center gap-3 px-4 py-2.5 text-brand-gray hover:bg-slate-50 hover:text-brand-primary rounded-lg font-medium text-sm transition-all" href="analise_ia_exportacao.html">\n<svg class="w-5 h-5" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path d="M9 17v-2m3')
        .replace('<a class="flex items-center gap-3 px-4 py-2.5 text-brand-gray hover:bg-slate-50 hover:text-brand-primary rounded-lg font-medium text-sm transition-all" href="#">', '<a class="flex items-center gap-3 px-4 py-2.5 text-brand-gray hover:bg-slate-50 hover:text-brand-primary rounded-lg font-medium text-sm transition-all" href="#">')
        .replace('<a class="text-sm font-bold text-brand-primary hover:underline transition-all" href="#">Ver todos</a>', '<a class="text-sm font-bold text-brand-primary hover:underline transition-all" href="listagem_estagiarios.html">Ver todos</a>')
        .replace(/<button class="text-xs font-bold text-brand-primary hover:bg-indigo-50 px-3 py-1 rounded-md transition-colors">Detalhes<\/button>/g, '<button class="text-xs font-bold text-brand-primary hover:bg-indigo-50 px-3 py-1 rounded-md transition-colors" onclick="window.location.href=\'perfil_estagiario.html\'">Detalhes</button>');
});

// 2. listagem_estagiarios.html
processFile('c:\\git\\pessoal\\dossie-ai\\listagem_estagiarios.html', content => {
    return content
        .replace('<html lang="en">', '<html lang="pt-br">')
        .replace('<a class="flex items-center gap-3 px-4 py-2.5 text-brand-gray hover:bg-slate-50 hover:text-brand-primary rounded-lg font-medium text-sm transition-all" href="#">\n<svg class="w-5 h-5" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path d="M3 12l2-2', '<a class="flex items-center gap-3 px-4 py-2.5 text-brand-gray hover:bg-slate-50 hover:text-brand-primary rounded-lg font-medium text-sm transition-all" href="dashboard_principal.html">\n<svg class="w-5 h-5" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path d="M3 12l2-2')
        .replace('<a class="flex items-center gap-3 px-4 py-2.5 sidebar-active rounded-lg font-medium text-sm transition-all shadow-sm shadow-brand-primary/20" href="#">', '<a class="flex items-center gap-3 px-4 py-2.5 sidebar-active rounded-lg font-medium text-sm transition-all shadow-sm shadow-brand-primary/20" href="listagem_estagiarios.html">')
        .replace('<a class="flex items-center gap-3 px-4 py-2.5 text-brand-gray hover:bg-slate-50 hover:text-brand-primary rounded-lg font-medium text-sm transition-all" href="#">\n<svg class="w-5 h-5" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path d="M9 19v-6a2', '<a class="flex items-center gap-3 px-4 py-2.5 text-brand-gray hover:bg-slate-50 hover:text-brand-primary rounded-lg font-medium text-sm transition-all" href="analise_ia_exportacao.html">\n<svg class="w-5 h-5" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path d="M9 19v-6a2')
        .replace('<a class="flex items-center gap-3 px-4 py-2.5 text-brand-gray hover:bg-slate-50 hover:text-brand-primary rounded-lg font-medium text-sm transition-all" href="#">\n<svg class="w-5 h-5" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path d="M9 17v-2m3', '<a class="flex items-center gap-3 px-4 py-2.5 text-brand-gray hover:bg-slate-50 hover:text-brand-primary rounded-lg font-medium text-sm transition-all" href="analise_ia_exportacao.html">\n<svg class="w-5 h-5" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path d="M9 17v-2m3')
        .replace(/<tr class="hover:bg-slate-50\/80 transition-all cursor-default group">/g, '<tr class="hover:bg-slate-50/80 transition-all cursor-pointer group" onclick="window.location.href=\'perfil_estagiario.html\'">');
});

// 3. perfil_estagiario.html
processFile('c:\\git\\pessoal\\dossie-ai\\perfil_estagiario.html', content => {
    return content
        .replace(/estate-bg/g, 'brand-bg')
        .replace(/estate-surface/g, 'white')
        .replace(/estate-indigo/g, 'brand-primary')
        .replace(/estate-slate/g, 'brand-slate')
        .replace(/estate-border/g, 'brand-border')
        .replace(/<html lang="en">/, '<html lang="pt-br">')
        .replace('<a class="flex items-center px-2 py-2 text-sm font-medium text-slate-600 rounded-md hover:bg-slate-50" href="#">\n<svg class="mr-3 h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path d="M3 12', '<a class="flex items-center px-2 py-2 text-sm font-medium text-slate-600 rounded-md hover:bg-slate-50" href="dashboard_principal.html">\n<svg class="mr-3 h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path d="M3 12')
        .replace('<a class="flex items-center px-2 py-2 text-sm font-medium text-white bg-brand-primary rounded-md" href="#">', '<a class="flex items-center px-2 py-2 text-sm font-medium text-white bg-brand-primary rounded-md" href="listagem_estagiarios.html">')
        .replace('<a class="flex items-center px-2 py-2 text-sm font-medium text-slate-600 rounded-md hover:bg-slate-50" href="#">\n<svg class="mr-3 h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path d="M9 19', '<a class="flex items-center px-2 py-2 text-sm font-medium text-slate-600 rounded-md hover:bg-slate-50" href="analise_ia_exportacao.html">\n<svg class="mr-3 h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path d="M9 19')
        .replace('<a class="flex items-center px-2 py-2 text-sm font-medium text-slate-600 rounded-md hover:bg-slate-50" href="#">\n<svg class="mr-3 h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path d="M9 17', '<a class="flex items-center px-2 py-2 text-sm font-medium text-slate-600 rounded-md hover:bg-slate-50" href="analise_ia_exportacao.html">\n<svg class="mr-3 h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path d="M9 17');
});

// 4. analise_ia_exportacao.html
processFile('c:\\git\\pessoal\\dossie-ai\\analise_ia_exportacao.html', content => {
    return content
        .replace(/dossie-bg/g, 'brand-bg')
        .replace(/dossie-surface/g, 'white')
        .replace(/dossie-primary/g, 'brand-primary')
        .replace(/dossie-secondary/g, 'brand-secondary')
        .replace(/dossie-textPrimary/g, 'brand-slate')
        .replace(/dossie-textSecondary/g, 'brand-gray')
        .replace(/dossie-border/g, 'brand-border')
        .replace(/<html lang="pt-br">/g, '<html lang="pt-br">')
        .replace('<a class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 nav-item-hover transition-colors" href="#">\n<svg class="w-5 h-5" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path d="M3 12', '<a class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 nav-item-hover transition-colors" href="dashboard_principal.html">\n<svg class="w-5 h-5" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path d="M3 12')
        .replace('<a class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 nav-item-hover transition-colors" href="#">\n<svg class="w-5 h-5" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path d="M12 4.354', '<a class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 nav-item-hover transition-colors" href="listagem_estagiarios.html">\n<svg class="w-5 h-5" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path d="M12 4.354')
        .replace('<a class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg nav-item-active shadow-sm shadow-indigo-200" href="#">', '<a class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg nav-item-active shadow-sm shadow-indigo-200" href="analise_ia_exportacao.html">')
        .replace('<a class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 nav-item-hover transition-colors" href="#">\n<svg class="w-5 h-5" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path d="M9 17', '<a class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 nav-item-hover transition-colors" href="analise_ia_exportacao.html">\n<svg class="w-5 h-5" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path d="M9 17');
});

console.log("Arquivos processados com sucesso.");
