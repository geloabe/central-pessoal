// As alternativas são embaralhadas a cada tentativa (cert-estudo-ui.js, ordemAlternativas): explicações e enunciados
// não podem citar alternativa por letra, só pelo conteúdo. Rodar: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
await import(pathToFileURL(join(raiz, 'assets', 'cert.js')).href);
await import(pathToFileURL(join(raiz, 'assets', 'cert-estudo.js')).href);
const dir = join(raiz, 'assets', 'cert');
for (const f of readdirSync(dir).filter((x) => x.endsWith('.js')).sort()) await import(pathToFileURL(join(dir, f)).href);
const banco = globalThis.CP_ESTUDO.banco(globalThis.CP_CERT_CONTEUDO);

const L = String.raw`(?<![\p{L}\d_\-\/.])[A-E](?![\p{L}\d_\-\/])`; // letra solta A-E (não faz parte de sigla ou palavra)
const GRUPO = L + '(?:(?:, | e | ou )' + L + ')*';
const VERBO = String.raw`(?:está|estão|é|são|erra|erram|errada|errado|corretas?|certas?|and|is|are)(?![\p{L}])`;
const PADROES = [
  [new RegExp('(?:^|(?<=[.;:!?] ))' + GRUPO + ' ' + VERBO, 'u'), 'letra como sujeito ("C está certa", "A erra", "D e A são")'],
  [new RegExp(L + ' (?:e|ou) ' + L + ' ', 'u'), 'duas letras ("A e B ", "C ou D ")'],
  [/\([A-E]\)/, 'letra entre parênteses "(B)"'],
  [/\b(?:[Aa]lternativa|[Oo]p[cç][aã]o|[Ll]etra|[Oo]ption|[Cc]hoice|[Aa]nswer)s? [A-E](?![\p{L}\d_\-\/])/u, '"alternativa/opção/letra/option X"'],
  [/^[A-E][).:] /m, 'prefixo "A) ", "B. ", "C: "'],
  [/(?:^|\s)[A-E]\) /, 'letra com parêntese "A) "'],
];
// "projeto A", "project B", "VPC C" são nomes do cenário, não alternativas
const semNomes = (t) => String(t).replace(/\b(?:projetos?|projects?|VPCs?|redes?|networks?)\s+[A-E](?:\s+(?:e|ou|and|or)\s+[A-E])*(?![\p{L}\d_\-\/])/giu, 'projeto X');

function citacoes(t) {
  const s = semNomes(t);
  return PADROES.filter(([re]) => re.test(s)).map(([, nome]) => nome);
}

test('o banco de estudo carregou as questões', () => {
  assert.ok(banco.length >= 296, 'questões: ' + banco.length);
});

test('o detector pega citações por letra e ignora artigos e nomes de projeto', () => {
  for (const ruim of ['C está certa: porque sim.', 'A erra: não.', 'Sim. D e A são batch.', 'Veja (B) acima.', 'A alternativa B é falsa.', 'Option C is wrong.', 'B e D estão certas: x', 'A) texto', 'C e E corretas: x'])
    assert.ok(citacoes(ruim).length > 0, ruim);
  for (const bom of ['A opção com Pub/Sub está certa: sim.', 'A janela global é errada.', 'A BigQuery table is large.', 'A conta padrão é ampla.', 'O peering liga o projeto A e o projeto B.', 'Então A só alcança C com um peering direto.'])
    assert.deepEqual(citacoes(bom), [], bom);
});

test('nenhuma explicação cita alternativa por letra (a ordem é embaralhada a cada tentativa)', () => {
  const ruins = banco.map((q) => [q.id, citacoes(q.x)]).filter(([, c]) => c.length);
  assert.deepEqual(ruins, [], 'explicações com letra: ' + ruins.map(([id, c]) => id + ' [' + c.join('; ') + ']').join(', '));
});

test('nenhum enunciado cita alternativa por letra', () => {
  const ruins = banco.map((q) => [q.id, citacoes(q.e)]).filter(([, c]) => c.length);
  assert.deepEqual(ruins, [], 'enunciados com letra: ' + ruins.map(([id, c]) => id + ' [' + c.join('; ') + ']').join(', '));
});
